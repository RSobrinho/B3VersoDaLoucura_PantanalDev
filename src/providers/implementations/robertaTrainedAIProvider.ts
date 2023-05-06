// import * as tf from '@tensorflow/tfjs-node'
// import * as fs from 'fs'
// import { loadLayersModel } from '@tensorflow/tfjs-layers'

// class RobertaTrainedAIProvider {
//   private model: tf.LayersModel

//   constructor () {
//     this.model = tf.loadLayersModel('src/AIModels/tf_model.h5')
//   }

//   async predictSentiment (text: string): Promise<{ positive: number, negative: number, neutral: number }> {
//     const input = tf.tensor2d([text], [1, 1])
//     const inputProcessed = tf.pad(input, [[0, 0], [0, 1000 - text.length]], 'CONSTANT')

//     const output = this.model.predict(inputProcessed) as tf.Tensor
//     const scores = output.dataSync()

//     const positive = scores[2] * 100
//     const negative = scores[0] * 100
//     const neutral = scores[1] * 100

//     return { positive, negative, neutral }
//   }
// }

// export const robertaTrainedAIProvider: RobertaTrainedAIProvider = new RobertaTrainedAIProvider()
