export class Usuario
{
    id?: Number;
    userName?: String;
    registerDate?: String;
    punchIn?: String;
    punchOut?: String;

    constructor(id: Number, userName: String, registerDate: String, punchIn: String, punchOut: String) 
    {
        this.id = id;
        this.userName = userName;
        this.registerDate = registerDate;
        this.punchIn = punchIn;
        this.punchOut = punchOut;
    }
}