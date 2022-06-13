import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Grid, Table } from 'semantic-ui-react';
import { read, utils } from 'xlsx';
const Students = () => {
    const [StdData, setStdData] = useState(null);
    useEffect(() => {
        axios.get("./std").then(({ data }) => {
            console.log(data);
            setStdData(data)
        })
    }, [0])
    return <div style={{ marginTop: "20px" }}>
        <div style={{ background: "#84778b12" }}>
            <Container text>
                <Grid columns={2}>
                    <Grid.Column>
                        Upload excel file
                    </Grid.Column>
                    <Grid.Column>

                        <Button
                            onClick={async (e) => {
                                let fl = document.createElement("input")
                                fl.type = "file"
                                fl.click()

                                fl.onchange = async () => {
                                    const file = fl.files[0];
                                    let data = await file.arrayBuffer()
                                    let w = read(data)
                                    let asJson = utils.sheet_to_json(w.Sheets['Sheet1'])
                                    axios.post("./std", { std: asJson }).then(({ data }) => {
                                        setStdData(asJson)

                                    })

                                }

                            }}
                        >Upload</Button>
                        {StdData && StdData.length > 0 &&
                            <a href="/idgen">

                                <Button secondary>Download Id</Button>
                            </a>
                        }
                    </Grid.Column>
                </Grid>

            </Container>

        </div>
        <div style={{ marginTop: "50px" }}>
            {StdData &&

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Sn</Table.HeaderCell>
                            <Table.HeaderCell>Ad.No</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Class</Table.HeaderCell>
                            <Table.HeaderCell>Booth.No</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {StdData.map((_eStd) => (
                            <Table.Row>
                                <Table.HeaderCell>{_eStd["id"]}</Table.HeaderCell>
                                <Table.HeaderCell>{_eStd["adno"]}</Table.HeaderCell>
                                <Table.HeaderCell>{_eStd["name"]}</Table.HeaderCell>
                                <Table.HeaderCell>{_eStd["class"]}</Table.HeaderCell>
                                <Table.HeaderCell>{_eStd["booth"]}</Table.HeaderCell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

            }
        </div>
    </div>;
}

export default Students;
