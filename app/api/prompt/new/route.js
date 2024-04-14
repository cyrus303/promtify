import {connectToDB} from '@utils/database';
import PromptModel from '@models/prompt';

export const POST = async (req, res) => {
  const {userId, prompt, tag} = await req.json();

  try {
    await connectToDB();
    const newPrompt = {
      creator: userId,
      prompt,
      tag,
    };
    await PromptModel.create(newPrompt);
    return new Response(JSON.stringify(newPrompt), {status: 201});
  } catch (error) {
    return new Response('Error creating a prompt', error);
  }
};
