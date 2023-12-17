import { useEffect, useRef, useState } from "react"
import HerosStyle from "./style.module.css"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { getRandomColor } from "../../getRandomColor/getRandomColor"
import logo from "../../imges/Top_Trumps.svg"
import PropTypes from "prop-types"

const Heros = ({yourPoint, computerPoint, addYourPoint, addComputerPoint, set_info_last_round}) => {

    const [heros, setHeros] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [result, setResult] = useState("")
    const [on_off_click, setOn_off_click] = useState(true)

    const location = useLocation()
    const { state } = location

    const navigation = useNavigate()

    const handlerShowResult = (id) => {

        setOn_off_click(!on_off_click)

        const max = heros.reduce((aggr, hero) => {
            let max = +hero.powerstats[state]
            if (max > aggr) {
                aggr = max
                return aggr
            }
            return aggr
        }, Number.NEGATIVE_INFINITY)

        const filterd = heros.filter(hero => {
            return hero.powerstats[state] === max + ""
        })

        if (filterd.length === 1 && filterd[0].id === id) {
            setResult("Great !")
            addYourPoint()
        }else if (filterd.length === 2){
            setResult("Tie")
        }
        else {
            setResult("Ooops !")
            addComputerPoint()
        }

        setShowResult(!showResult)
    }

    const getDatas = async () => {
        let firstHero_ID = Math.floor(Math.random() * 731) + 1
        let secondtHero_ID = Math.floor(Math.random() * 731) + 1

        try {
            // հարցում սերվեր 1-ին հերոսի համար
            const result_1 = await fetch(`https://superheroapi.com/api.php/4317279331831123/${firstHero_ID}`) 
            const data_1 = await result_1.json()
            // հարցում սերվեր 2-րդ հերոսի համար
            const result_2 = await fetch(`https://superheroapi.com/api.php/4317279331831123/${secondtHero_ID}`)
            const data_2 = await result_2.json()

            // 1-ին եվ 2-րդ հարցումների ժամանակ եկող տվյալների օբյեկտի մեջ կա ամբողջական ինֆորմացիա տվյալ id-ով հերոսի մասին, 
            // բայց քանի որ ամբողջական ինֆորմացիայի օբյեկտի մեջ գոյություն ունեցող powerstats դաշտը նույնպես օբյեկտ է, 
            // որի մեջ պահպանվող տվյալներն իրենցից պետք է ներկայացն են հերոսների տարբեր հատկանիշների վերաբերյալ միավորներ 1-100 սահմանում,
            // սակայն շատ հաճախ լինում են null արժեքի, ուստի ստիպված նորից առանձին հարցում եմ անում սերվեր, URL-ի մեջ ավելացնելով powerstats մասը,
            // որովհետև տվյալ դեպքում, երբ առանձին հարցում եմ անում սերվեր powerstats-ի մասին ինֆորմացիա ստանալու համար,
            // հազվադեպ է պատահում, որ օբյեկտի արժեքները null լինեն։

            const hero_1_prop = await fetch(`https://superheroapi.com/api.php/4317279331831123/${firstHero_ID}/powerstats`)
            const hero_1_result = await hero_1_prop.json()

            const hero_2_prop = await fetch(`https://superheroapi.com/api.php/4317279331831123/${secondtHero_ID}/powerstats`)
            const hero_2_result = await hero_2_prop.json()

            data_1.powerstats = hero_1_result
            data_2.powerstats = hero_2_result

            const datas = [data_1, data_2].map((data) => {
                if (data.powerstats[state] === "null") {
                    data.powerstats[state] = Math.floor(Math.random() * 100 + 1) + ""
                    return data
                } else {
                    return data
                }
            })

            setHeros([...datas])

            setTimeout(() => {
                setShowImage(!showImage)
            }, 1000)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDatas()
    }, [])

    useEffect(() => {
        set_info_last_round(result)
    }, [result])


    return (
        <div className={`${HerosStyle.tow_heros}`}>
            <img
                className={`${HerosStyle.img_bg}`}
                src={require("../../imges/heros_bagground.png")}
            />

            <header className={`${HerosStyle.header}`}>
                <div className={`${HerosStyle.container}`}>
                    <div className={`${HerosStyle.logo_container}`}>
                        <img src={logo} />
                    </div>
                    <div className={`${HerosStyle.link_container}`}>
                        <ul>
                            <Link 
                               className={`${HerosStyle.link}`}
                               to="/aboutGame"
                            >
                               <li>About game</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </header>

            <div className={`${HerosStyle.type_of_war_container}`}>
                <div className={`${HerosStyle.type_of_war}`}>
                    The <span>{state}</span> war
                </div>
                <div className={
                    `
                        ${HerosStyle.result}
                        ${result === "Great !" ? HerosStyle.result_graet : ""}
                        ${result === "Tie" ? HerosStyle.result_tie : ""}
                        ${result === "Ooops !" ? HerosStyle.result_ooops : ""}
                        `
                }>{result}</div>
            </div>


            <div className={`${HerosStyle.heros_container}`}>

                {
                    heros.map((hero, index) => {
                        return (
                            <div 
                                 key={hero.id}
                                 className={`${HerosStyle.heros_inner_container}`}>

                                {
                                    index === 0
                                    ?
                                    <h3 className={`${HerosStyle.points_gamer}`}>You: {yourPoint}</h3>
                                    :
                                    <h3 className={`${HerosStyle.points_gamer}`}>Computer: {computerPoint}</h3>
                                }
                            <div
                                key={hero.id}
                                className={`${HerosStyle.heros}`}
                                style={{ boxShadow: `0px 0px 15px rgb${getRandomColor()}` }}
                            >
                                <h3 className={`${HerosStyle.name}`}>{hero.name}</h3>
                                {
                                    showImage
                                        ?
                                        <div
                                            onClick={() => { 
                                                if(on_off_click)
                                                handlerShowResult(hero.id)
                                            }}
                                            className={`${HerosStyle.hero_img_container}`}
                                        >

                                        {/* Երբեմն  hero.image.url-ը բրաուզերում նկար չի բացում*/}
                                            <img src={`${hero.image.url}`} alt={"this is a photo"} />
                                        </div>
                                        :
                                        ""
                                }

                                {
                                    showResult
                                        ?
                                        <h3
                                            className={`${HerosStyle.points}`}
                                        >{`${state}:    ${hero.powerstats[state]}`}</h3>
                                        :
                                        ""
                                }
                            </div>
                            </div>
                        )
                    })
                }

            </div>

             {
                showResult
                ?
                <div className={`${HerosStyle.button_container}`}>
                   <button 
                      onClick={() => navigation("/result_curd")}
                      className={`${HerosStyle.btn_show_result}`}>Show result</button>
                   <button 
                      onClick={() => navigation("/")}
                      className={`${HerosStyle.btn_next}`}>Next</button>
                </div>
                : ""
             }
            

        </div>
    )
}

Heros.propTypes = {
    yourPoint: PropTypes.number.isRequired,
    computerPoint: PropTypes.number.isRequired,
    addYourPoint: PropTypes.func.isRequired, 
    addComputerPoint: PropTypes.func.isRequired,
    set_info_last_round: PropTypes.func.isRequired,
}

Heros.defaultProps = {
    yourPoint: 0,
    computerPoint: 0,
    addYourPoint() {}, 
    addComputerPoint() {},
    set_info_last_round() {},
}

export default Heros