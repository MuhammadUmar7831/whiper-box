export default (status: number, message: string) => {
    const error = new Error(message) as any;
    error.status = status;
    return error;
};