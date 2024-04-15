//GET

import {connectToDB} from '@utils/database';
import PromptModel from '@models/prompt';

//GET
export const GET = async (request, {params}) => {
  try {
    await connectToDB();
    const response = await PromptModel.findById(
      params.userId
    ).populate('creator');
    if (!response)
      return new Response('Prompt not found', {status: 404});

    return new Response(JSON.stringify(response), {status: 200});
  } catch (error) {
    return new Response('Error fetching all posts', error);
  }
};

//PATCH
export const PATCH = async (request, {params}) => {
  const {prompt, tag} = await request.json();

  try {
    await connectToDB();
    const exisitingPrompt = await PromptModel.findById(params.userId);
    if (!exisitingPrompt)
      return new Response('Prompt not found', {status: 404});

    exisitingPrompt.prompt = prompt;
    exisitingPrompt.tag = tag;

    await exisitingPrompt.save();

    return new Response(JSON.stringify(exisitingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response('Error fetching all posts', error);
  }
};

//DELETE
export const DELETE = async (request, {params}) => {
  console.log(params);
  try {
    await connectToDB();
    await PromptModel.findByIdAndDelete(params.userId);
    return new Response('prompt deleted successfully', {status: 200});
  } catch (error) {
    return new Response('Error fetching all posts', error);
  }
};
