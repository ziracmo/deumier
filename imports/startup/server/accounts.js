/**
 * Accounts Setup
 */

import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
	// init counter at 0
	user.profile = {
		nom: options.profile.nom,
		prenom: options.profile.prenom,
		gender: options.profile.gender,
		birthdate: options.profile.birthdate,
		phone: options.profile.phone
	};
	return user;
});
