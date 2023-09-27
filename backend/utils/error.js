import { NextResponse } from "next/server";
import ErrorHandler from "./errorHandler";


export default function errorRet(err) {

    let error = { ...err };

    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Дотоод алдаа !!!";

    if (err.name == "ValidationError") {
        error = new ErrorHandler("Өөө, Талбар алдаатай !!!", 400);
    }
    if (err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }
    return NextResponse.json({
        success: false,
        error,
        message: error.message,
        stack: error.stack,
    },{status: error.statusCode });
}