import ReactDOM from "react-dom";
import { Button, Grid, } from 'semantic-ui-react'

import React, { useState } from 'react';
import Students from "./src/Students";
import Settings from "./src/Settings";
let menus = [{ p: "Settings", comp:<Settings/> }, { p: "students", comp: <Students/> }, { p: "Cantidates", comp: () => <div>M</div> },{ p: "result", comp: () => <div>M</div> }]
const App = () => {
    const [ActMenu, setActMenu] = useState(null);
    return (
        <div>

            <div style={{ padding: "10px 20px" }}>
                <Grid columns={2} >
                    <Grid.Row>
                        <Grid.Column>
                            <h1>
                                Elec Admin Panel
                            </h1>
                        </Grid.Column>
                        <Grid.Column>
                            {menus.map(e =>

                                <Button
                                key={e.p}
                                    primary={ActMenu == e.p}
                                    onClick={() => {
                                        setActMenu(e.p)
                                    }}

                                >{e.p}</Button>
                            )}
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>
            <div style={{ padding: "10px 20px" }}>
                {ActMenu&&menus[menus.findIndex(e=>e.p==ActMenu)].comp}
            </div>
        </div>
    );
}



const app = document.getElementById("app");
ReactDOM.render(<App />, app);