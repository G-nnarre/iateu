import { BaseEntity } from "../baseEntity";
import { AuthCredentials } from "./authCredentials";

export type User = BaseEntity & Partial<AuthCredentials>;