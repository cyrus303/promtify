import {connectToDB} from '@utils/database';
import PromptModel from '@models/prompt';
import UserModel from '@models/user';

export const POST = async (request) => {
  const {searchText} = await request.json();

  console.log(searchText);

  if (searchText.includes('#')) {
    try {
      await connectToDB();
      const userPosts = await PromptModel.find({
        tag: {$regex: searchText, $options: 'i'},
      }).populate('creator');
      return new Response(JSON.stringify(userPosts));
    } catch (error) {
      console.log('search error', error);
      return new Response(error);
    }
  } else {
    try {
      await connectToDB();
      const userData = await UserModel.find({
        username: {$regex: searchText, $options: 'i'},
      });

      const userIds = userData.map((user) => user._id);
      const userPosts = await PromptModel.find({
        creator: {$in: userIds},
      }).populate('creator');

      return new Response(JSON.stringify(userPosts));
    } catch (error) {
      console.log('search error', error);
      return new Response(error);
    }
  }
};
