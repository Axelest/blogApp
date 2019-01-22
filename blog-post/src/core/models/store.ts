import {IPost} from './post';
import {IPosts} from './posts';

export interface IStoreState {
     post : IPost,
     posts : IPosts
}