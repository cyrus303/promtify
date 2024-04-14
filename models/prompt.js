import mongoose, {Schema, model, models} from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is requred'],
  },
});

const PromptModel =
  models.PromptModel || model('PromptModel', PromptSchema);

export default PromptModel;
