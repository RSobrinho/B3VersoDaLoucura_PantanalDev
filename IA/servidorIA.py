import torch
from transformers import AutoTokenizer
from torch.nn import CrossEntropyLoss
import torch.nn as nn
import numpy as np
from typing import List, Optional, Tuple, Union
from transformers import AutoModelForSequenceClassification
from flask import Flask, request, jsonify

# A classe do modelo deve ser definida novamente
class XLMRobertaForSequenceClassification(nn.Module):
    def __init__(self,model,num_labels):
        super(XLMRobertaForSequenceClassification,self).__init__()
        self.roberta = model.roberta
        self.config = model.config
        self.num_labels = num_labels
        self.cls = nn.Linear(self.config.hidden_size,768)
        self.dropout = nn.Dropout(p=0.1)
        self.cls2 = nn.Linear(768,num_labels)

    def forward(
        self,
        input_ids: Optional[torch.Tensor] = None,
        attention_mask: Optional[torch.Tensor] = None,
        token_type_ids: Optional[torch.Tensor] = None,
        ) ->Tuple[torch.Tensor]:

        outputs = self.roberta(
            input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
        )

        sequence_output = outputs[0][:,0,:]
        prediction = self.cls(sequence_output)
        prediction = self.dropout(prediction)
        prediction = self.cls2(prediction)
        return prediction

# Carregue o modelo treinado
device = torch.device('cpu')
base_model = AutoModelForSequenceClassification.from_pretrained("twitter-xlm-roberta-base-sentiment-finetunned")
tokenizer = AutoTokenizer.from_pretrained("twitter-xlm-roberta-base-sentiment-finetunned")
num_labels = len(base_model.config.id2label)
model = XLMRobertaForSequenceClassification(model=base_model, num_labels=num_labels)
model.load_state_dict(torch.load('ourModel.pth', map_location=device))  # substitua pelo caminho correto para o modelo
model.eval()

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    texts = data['texts']
    
    predictions = []
    
    for text in texts:
        # Processar entrada e executar o modelo
        encodings = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors='pt')
        with torch.no_grad():  # Não é necessário calcular gradientes para inferência
            outputs = model(**encodings)
            prediction = torch.argmax(outputs, dim=-1)
            predictions.append(prediction.item())
            torch.cuda.empty_cache()  # Libera a memória do CUDA após cada previsão se estiver usando a GPU

    
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')