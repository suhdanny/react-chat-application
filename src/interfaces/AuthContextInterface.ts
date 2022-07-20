import { User as FirebaseUser } from 'firebase/auth';

export interface AuthContextInterface {
	user: FirebaseUser | null;
}
