import { FormControl } from '@angular/forms';

export class FormValidators {

    public static passwordsMatch(password: string, confirmedPassword: string) {

        interface NewType {
            [s: string]: boolean;
        }

        return (control: FormControl): NewType | null => {
            //getting undefined values for both variables
            //    console.log(password,confirmedPassword);
            //if I change this condition to === it throws the error if the 
            //  two fields are the same, so this part works
            if (password !== confirmedPassword) {
                return { 'passwordMismatch': true }
            } else {
                //it always gets here no matter what
                return null;
            }
        }
    }


}