import {connectToDB} from '@utils/database';
import PromptModel from '@models/prompt';

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const response = await PromptModel.find({}).populate('creator');
    return new Response(JSON.stringify(response), {status: 200});
  } catch (error) {
    return new Response('Error fetching all posts', error);
  }
};
