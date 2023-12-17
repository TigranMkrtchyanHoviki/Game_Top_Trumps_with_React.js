import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spiner from "./cpmponents/Spiner";
import Heros from "./cpmponents/Heros";
import AboutGame from "./cpmponents/AboutGame/AboutGame";
import Result from "./cpmponents/Result";
import { useState } from "react";

export const MyRoutes = () => {

    const [yourPoint, setYourPoint] = useState(0)
    const [computerPoint, setComputerPoint] = useState(0)
    const [result_last_round, setResult_last_round] = useState()

    const addYourPoint = () => {
        setYourPoint(yourPoint + 1)
    }

    const addComputerPoint = () => {
        setComputerPoint(computerPoint + 1)
    }

    const set_info_last_round = (result) => {
         if(result === "Great !")
            setResult_last_round("Winner of the last round is You")
         else if(result === "Ooops !")
            setResult_last_round("The winner of the last round is computer")
         else
            setResult_last_round("The last round ended in a draw")       
    }

    return (
        <BrowserRouter>
             <Routes>
                <Route index element={<Spiner />} />
                <Route path="/heros" element={<Heros yourPoint={yourPoint} 
                                                     computerPoint={computerPoint} 
                                                     addYourPoint={addYourPoint} 
                                                     addComputerPoint={addComputerPoint}
                                                     set_info_last_round={set_info_last_round}/>} 
                                              />
                <Route path="/aboutGame" element={<AboutGame />}/>
                <Route path="/result_curd" element={<Result yourPoint={yourPoint} 
                                                            computerPoint={computerPoint}
                                                            result_last_round={result_last_round} />} 
                                                    />
             </Routes>
        </BrowserRouter>
    )
}