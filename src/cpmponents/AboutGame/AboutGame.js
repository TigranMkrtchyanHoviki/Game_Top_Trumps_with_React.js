import AboutGameStyle from "./style.module.css"
import { Link } from "react-router-dom"
import logo from "../../imges/Top_Trumps.svg"

const AboutGame = () => {
    return (
        <div className={`${AboutGameStyle.container}`}>

            <header className={`${AboutGameStyle.header}`}>
                <div className={`${AboutGameStyle.header_container}`}>
                    <div className={`${AboutGameStyle.logo_container}`}>
                        <img src={logo} />
                    </div>
                    <div className={`${AboutGameStyle.link_container}`}>
                        <ul>
                            <Link
                                className={`${AboutGameStyle.link}`}
                                to="/"
                            >
                                <li>Start The Game</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </header>

            <div className={`${AboutGameStyle.inner_container}`}>
                <h3 className={`${AboutGameStyle.game_name}`}>Top trumps</h3>
                <h3 className={`${AboutGameStyle.game_rules}`}>The rules of top trumps are:</h3>
                <p><span>1.</span> Shuffle the deck and pass out the cards until the whole deck has been dealt out</p>
                <p><span>2.</span> One person begins by reading out a category such as Intelligence or Funniest and each players cards have a
                    number rating of 1-100 on each category
                </p>
                <p><span>3.</span> Then the person with the highest number rating in the chosen category wins the other players card and the
                    winner of that round chooses the next category</p>
                <p><span>4.</span> This continues until one of the players loses all of their cards</p>
            </div>
        </div>
    )
}

export default AboutGame