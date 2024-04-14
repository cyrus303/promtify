import {connectToDB} from '@utils/database';
import PromptModel from '@models/prompt';

export const GET = async (request, {params}) => {
  try {
    await connectToDB();
    const response = await PromptModel.find({
      creator: params.userId,
    }).populate('creator');
    return new Response(JSON.stringify(response), {status: 200});
  } catch (error) {
    return new Response('Error fetching all posts', error);
  }
};
