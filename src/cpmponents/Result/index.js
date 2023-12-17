import ResultStyles from "./style.module.css"
import { Link } from "react-router-dom"
import logo from "../../imges/Top_Trumps.svg"
import PropTypes from "prop-types"

const Result = ({ yourPoint, computerPoint, result_last_round }) => {

    return (
        <div className={`${ResultStyles.container}`}>

            <header className={`${ResultStyles.header}`}>
                <div className={`${ResultStyles.inner_container}`}>
                    <div className={`${ResultStyles.logo_container}`}>
                        <img src={logo} />
                    </div>
                    <div className={`${ResultStyles.link_container}`}>
                        <ul>
                            <Link
                                className={`${ResultStyles.link}`}
                                to="/">
                                <li>Start The Game</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </header>

            <div className={`${ResultStyles.result_curd}`}>
                <h3 className={`${ResultStyles.title}`}>Your Result Card!</h3>
                <div className={`${ResultStyles.points}`}>
                    <span>You: {yourPoint}</span>
                    <span>Computer: {computerPoint}</span>
                </div>
                <div className={`${ResultStyles.result_last_round}`}>{result_last_round}</div>
                <div className={`${ResultStyles.play_again}`}>Play agine and see who will win!</div>
            </div>
        </div>
    )
}

Result.propTypes = {
    computerPoint: PropTypes.number.isRequired,
    yourPoint: PropTypes.number.isRequired,
    result_last_round: PropTypes.string.isRequired,
  }

Result.defaultProps = {
    result_last_round: "The name of the winner of the last round should be here"
}

export default Result