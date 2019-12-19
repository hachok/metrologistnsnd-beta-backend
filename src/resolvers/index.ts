import { Query } from './Query'
import { Subscription } from './Subscription'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'
import { User } from './User'
import { Post } from './Post'
import {device} from "./Mutation/device";
import {Device} from "./Device";
import {letter} from "./Mutation/letter";
import {TR} from "./TR";
import {tr} from "./Mutation/tr";
import {changeuser} from "./Mutation/changeuser";
import {dtc} from "./Mutation/dtc";
import {DTC} from "./DTC";


export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...device,
    ...letter,
    ...tr,
    ...changeuser,
   ...dtc
  },
  Subscription,
  User,
  Post,
  Device,
  TR,
  DTC
}
