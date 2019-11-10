export class ErrorHandler extends Error {
  protected status: any;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
  }

  public dev = () => {
    return { message: this.message, status: this.status };
  };
}
