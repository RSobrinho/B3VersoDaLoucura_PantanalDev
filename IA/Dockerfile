FROM python:3.8

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir torch==1.9.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip install --no-cache-dir -r requirements.txt

COPY servidorIA.py /app
COPY ourModel.pth /app
COPY ./twitter-xlm-roberta-base-sentiment-finetunned /app/twitter-xlm-roberta-base-sentiment-finetunned

EXPOSE 5000

CMD ["python", "/app/servidorIA.py"]