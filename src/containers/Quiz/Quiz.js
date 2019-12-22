import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Столица Беларуссии?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: 'Брест', id: 1},
                    {text: 'Витебск', id: 2},
                    {text: 'Минск', id: 3},
                    {text: 'Гродно', id: 4}
                ]
            },
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Крансый', id: 2},
                    {text: 'Голубое', id: 3},
                    {text: 'Зелёный', id: 4}
                ]
            }
        ]
    }
    onAnswerClickHandler = (answerId) => {
        if(this.state.answerState){
const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId === answerId) {
            this.setState({answerState: {[answerId]: 'success'}})
            const timeout = window.setTimeout(() => {
                if (this.quizFinished()) {

                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({answerState: {[answerId]: 'error'}})
        }

    }

    quizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на выпросы</h1>
                    <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLenth={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}/>
                </div>
            </div>
        )
    }
}


export default Quiz