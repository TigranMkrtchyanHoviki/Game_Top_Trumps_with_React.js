import { useEffect, useRef, useState } from "react"
import SpinnerStyles from "./style.module.css"
import { useNavigate, Link } from "react-router-dom"
import logo from "../../imges/Top_Trumps.svg"

const Spiner = () => {

    const [count_rotate, setCount_rotate] = useState(null)
    const [prop, setProp] = useState("")
    const [show_spiner_result, setShow_spiner_result] = useState(false)
    
    const powerstats = ["intelligence", "strength", "speed", "durability", "power", "combat"]

    const navigation = useNavigate()

    const hendlerSpiner = () => {
        const index = Math.floor((Math.random() * powerstats.length))

        const state = powerstats[index]

        setTimeout(() => {
            setProp(state)
            setShow_spiner_result(true)
            setTimeout(() => {
                navigation("/heros", { state: state })
            }, 1000)
        }, 5000)

        setCount_rotate((Math.random() * 2520) + 1080)


    }

    return (
        <div className={`${SpinnerStyles.container}`} >

            <img src={require("../../imges/spnner_background-001.jpg")} />

            <header className={`${SpinnerStyles.header}`}>
                <div className={`${SpinnerStyles.inner_container}`}>
                    <div className={`${SpinnerStyles.logo_container}`}>
                        <img src={logo} />
                    </div>
                    <div className={`${SpinnerStyles.link_container}`}>
                        <ul>
                            <Link 
                               className={`${SpinnerStyles.link}`}
                               to="/aboutGame">
                                <li>About game</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </header>

            <h3 className={`${SpinnerStyles.title}`}>WAR</h3>

            <div
                className={`${SpinnerStyles.spiner}`}
                style={{ transition: `5s`, transform: `rotate(${count_rotate}deg)` }}
            >
                <img src={require("../../imges/spinner_003.png")} />

                <h4
                    onLoad={(e) => console.log(e)}
                    className={`${SpinnerStyles.intelligence}`}>Intelligence</h4>
                <h4 className={`${SpinnerStyles.strength}`}>Strength</h4>
                <h4 className={`${SpinnerStyles.speed}`}>Speed</h4>
                <h4 className={`${SpinnerStyles.durability}`}>Durability</h4>
                <h4 className={`${SpinnerStyles.power}`}>Power</h4>
                <h4 className={`${SpinnerStyles.combat}`}>Combat</h4>
            </div>

            {

                show_spiner_result
                    ?

                    <div className={`${SpinnerStyles.arrow}`}
                        onClick={hendlerSpiner}
                    >
                        {prop}
                    </div>
                    :
                    ""

            }

            <div className={`${SpinnerStyles.spiner_container}`}>
                <button onClick={hendlerSpiner}>Spin</button>
            </div>
        </div>
    )
}

export default Spiner