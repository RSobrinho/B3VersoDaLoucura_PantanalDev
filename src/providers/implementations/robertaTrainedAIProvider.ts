// import * as tf from '@tensorflow/tfjs-node'
// import * as fs from 'fs'
// import { loadLayersModel } from '@tensorflow/tfjs-layers'

// class RobertaTrainedAIProvider {
//   private model: tf.LayersModel

//   constructor () {
//     this.model = this.loadModel('src/AIModels/roberta.h5')
//   }

//   private async loadModel (modelPath: string): Promise<tf.LayersModel> {
//     const buffer: Buffer = fs.readFileSync(modelPath)
//     const modelJson: string = buffer.toString()
//     const model: tf.LayersModel = await loadLayersModel(tf.io.fromJSON(modelJson))
//     return model
//   }

//   async predictSentiment (text: string): Promise<number> {
//     const input: tf.Tensor2D = tf.tensor2d([[text]])
//     const output: tf.Tensor<tf.Rank> = this.model.predict(input) as tf.Tensor<tf.Rank>
//     const [prediction]: number[] = await output.array()
//     return prediction
//   }
// }

// export const robertaTrainedAIProvider: RobertaTrainedAIProvider = new RobertaTrainedAIProvider()
