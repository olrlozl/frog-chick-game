import mongoose, { Schema, Document } from 'mongoose';

type UserStateType = 'online' | 'offline' | 'playing';

interface IUser extends Document {
  nickname: string;
  wins: number;
  losses: number;
  state: UserStateType;
  rank: number;
  friends: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  nickname: { type: String, required: true, unique: true, minlength: 2, maxlength: 6 },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  state: { type: String, required: true },
  rank: { type: Number, required: true },
  friends: [ { type: mongoose.Types.ObjectId, ref: 'User'}]
})


const User = mongoose.model<IUser>('User', userSchema);
export default User;