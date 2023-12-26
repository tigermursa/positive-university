
/*
const getSingleStudent: RequestHandler = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        //sending response 
        // res.status(200).json({
        //     success: true,
        //     message: "Single Student Getting ",
        //     data: result,
        // })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student ia single getting successfully !",
            data: result,
        })
    } catch (error: any) {
        // res.status(500).json({
        //     success: true,
        //     message: "something went wrong ! ",
        //     error: error.message,
        // })
        next(error);
    }
}

*/