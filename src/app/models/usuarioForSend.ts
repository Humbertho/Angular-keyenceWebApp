export class UsuarioForSend
{
    userName?: String;
    registerDate?: String;
    punchIn?: String;
    punchOut?: String;

    constructor(userName: String, registerDate: String, punchIn: String, punchOut: String) 
    {
      this.userName = userName;
      this.registerDate = registerDate;
      this.punchIn = punchIn;
      this.punchOut = punchOut;
    }
}