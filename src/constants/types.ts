type User = {
	email: string;
	name: string;
	phone_number: number;
};

type Category = {
	name: string;
	description: string;
	image: string;
	id: string | number;
};

export type { User, Category };
