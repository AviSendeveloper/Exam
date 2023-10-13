const QuestionContent = require("../Models/QuestionContent");

exports.questionList = async () => {
    const questionList = await QuestionContent.find({})
        .populate({ path: "meta.boardId", select: "name" })
        .populate({ path: "meta.standardId", select: "name" })
        .populate({ path: "meta.subjectId", select: "name" })
        .populate({ path: "meta.topicId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "startAge endAge" });

    return questionList;
};

exports.createQuestion = async ({
    question,
    options,
    correctOption,
    examType,
    boardId,
    standardId,
    subjectId,
    topicId,
    ageGroupId,
    difficultyLevel,
    user,
}) => {
    const { _id: userId, role } = user;

    const updatedContent = {
        question: question,
        options: {
            1: options["1"],
            2: options["2"],
            3: options["3"],
            4: options["4"],
        },
        correctOption: correctOption,
        creatorId: userId,
        isPublic: role == "admin" || role == "creator" ? true : false,
        totalClicked: 0,
        meta: {
            examType: examType,
            boardId: boardId,
            standardId: standardId,
            subjectId: subjectId,
            topicId: topicId,
            ageGroupId: ageGroupId,
            difficultyLevel: difficultyLevel,
        },
    };

    const updatedQuestion = await QuestionContent.create({ ...updatedContent });

    return updatedQuestion;
};

exports.getQuestionDetails = async ({ questionId }) => {
    const questionDetails = await QuestionContent.findOne({
        _id: questionId,
    })
        .populate({ path: "meta.boardId", select: "name" })
        .populate({ path: "meta.standardId", select: "name" })
        .populate({ path: "meta.subjectId", select: "name" })
        .populate({ path: "meta.topicId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "startAge endAge" });

    return questionDetails;
};

exports.updateQuestion = async ({
    questionId,
    question,
    options,
    correctOption,
    examType,
    boardId,
    standardId,
    subjectId,
    topicId,
    ageGroupId,
    difficultyLevel,
    user,
}) => {
    const { _id: userId, role } = user;

    const updatedContent = {
        question: question,
        options: {
            1: options["1"],
            2: options["2"],
            3: options["3"],
            4: options["4"],
        },
        correctOption: correctOption,
        creatorId: userId,
        isPublic: role == "admin" || role == "creator" ? true : false,
        totalClicked: 0,
        meta: {
            examType: examType,
            boardId: boardId,
            standardId: standardId,
            subjectId: subjectId,
            topicId: topicId,
            ageGroupId: ageGroupId,
            difficultyLevel: difficultyLevel,
        },
    };

    const updatedQuestion = await QuestionContent.findByIdAndUpdate(
        {
            _id: questionId,
        },
        { ...updatedContent },
        { new: true }
    );

    return updatedQuestion;
};