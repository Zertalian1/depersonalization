import React, {useState} from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

import './assets/styles/main.css';
import './assets/styles/adaptive-design.css';

import {publicRoutes } from "./routes/index"
import View from "./components/View";
import AuthButton from "./components/Buttons/AuthButton";
import DepersonalizationButton from "./components/Buttons/DepersonalizationButton";
import UploadButton from "./components/Buttons/UploadButton";
import DownloadButton from "./components/Buttons/DownloadButton";
import GetInButton from "./components/Buttons/GetInButton";

const App = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);

    const handleSubmit = (columns) => {
        setSelectedColumns(columns);
    };
    return (
        <div className="App-background">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm">

                    </div>
                    <div className="col-sm">
                        <div className="table row justify-content-center mt-4">
                            <table className="table table-bordered " >
                                <View handleSubmit={handleSubmit} />
                            </table>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="row">
                            <AuthButton/>
                            <UploadButton/>
                            <DepersonalizationButton selectedColumns={selectedColumns}/>
                            <DownloadButton/>
                            <GetInButton/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;