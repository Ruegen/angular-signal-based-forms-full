import { IUser } from "../../global-interfaces";

const user: IUser = {
	id: 'a1b2c3d4',
	contact: { 
		email: 'cody@example.com',
		phone: '+45 101 468 435',
	},
	name: 'Cody Rhodes'
};


function fakeFetchUser(): Promise<IUser> {
	return new Promise<IUser>((resolve) => {
		setTimeout(() => resolve(user), 1000);
	});
}

export { fakeFetchUser };