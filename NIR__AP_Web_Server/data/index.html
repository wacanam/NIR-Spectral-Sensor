<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="Neural Network Based Durian Fruit Maturity and Ripeness Evaluator Employing Near-Infrared (NIR) Spectral Sensor">
    <title>NIR Spectral Sensor</title>
    <link rel="shortcut icon" href="/assets/icon/scan.ico" type="image/x-icon">
    <!-- <link rel="stylesheet" href="/assets/css/bootstrap.min.css"> -->
    <!-- <link rel="stylesheet" href="/assets/css/normalize.min.css"> -->
    <link rel="stylesheet" href="./assets/css/w3.css">
    <link rel="stylesheet" href="./assets/css/fontawesome.min.css">

    <script src="./assets/js/Chart.min.js"></script>
    <script src="./assets/js/jquery.min.js"></script>
    <!-- <script src="./assets/js/fontawesome.min.js"></script> -->
    <script src="./assets/js/tf.min.js"></script>
    <!-- <script src="/assets/js/jquery-ui.min.js"></script> -->

</head>

<body onload="javascript:connect()">

    <div class="w3-sidebar w3-bar-block w3-collapse w3-card w3-green" style="width:200px;" id="mySidebar">
        <button class="w3-bar-item w3-button w3-hide-large w3-right-align" id="home_tab"
            onclick="w3_close()"><b>&times;</b></button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide"><i class="fa fa-home"></i>&nbsp;Home</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="login_tab"
            onclick="document.getElementById('login').style.display ='block'"><i
                class="fa fa-sign-in"></i>&nbsp;Login</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="data_tab"><i
                class="fa fa-file"></i>&nbsp;Data</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="scan_tab"><i
                class="fa fa-search"></i>&nbsp;Scanner</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="labeling_tab"
            onclick="document.getElementById('labeling').style.display ='block'"><i
                class="fa fa-refresh"></i>&nbsp;Labeling</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="train_tab"
            onclick="document.getElementById('trainning').style.display ='block'"><i
                class="fa fa-refresh"></i>&nbsp;Train</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="report_tab"
            onclick="document.getElementById('report').style.display ='block'"><i
                class="fa fa-print"></i>&nbsp;Report</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="terminal_tab"
            onclick="document.getElementById('terminal').style.display ='block'"><i
                class="fa fa-terminal"></i>&nbsp;Console
            log</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="setting_tab"
            onclick="document.getElementById('setting').style.display ='block'"><i
                class="fa fa-gear"></i>&nbsp;Setting</button>
        <button href="#" class="w3-bar-item w3-button w3-medium w3-wide" id="logout_tab"
            onclick="document.getElementById('logout').style.display ='block'"><i
                class="fa fa-sign-out"></i>&nbsp;Logout</button>
    </div>
    <div class="w3-main" style="margin-left:200px">
        <div class="w3-teal">
            <button class="w3-button w3-teal w3-xlarge w3-hide-large" onclick="w3_open()">&#9776;</button>
            <div class="w3-container">
                <h1 class="w3-wide">NIR Spectral Sensor</h1>
            </div>
        </div>
        <div>
            <div class="w3-panel w3-red w3-wide" id="non_member" style="display: block;">
                <h3>Opps!</h3>
                <p>You're not a member.</p>
                <p>You must Login first to enable important features:)</p>
            </div>

            <div class="chart-container" style="position: relative; height:70vh; width:100%" id="line_graph">
                <canvas id="predictionChart"></canvas>
            </div>

            <div class="w3-cell-row w3-padding" style="height: 80px;">
                <div class="w3-container w3-red w3-cell w3-cell-middle" style="width: 80%;">
                    <button id="scan" onclick="scan('*')" class="w3-button w3-block w3-hover-none">Scan</button>
                </div>
                <div class="w3-container w3-blue w3-cell w3-cell-middle" id="remove_dataset" style="width: 20%">
                    <button id="remove_dataset" onclick="removeDataset(predictionChart)"
                        class="w3-button w3-block w3-hover-none">Remove
                        Dataset</button>
                </div>
            </div>

            <div>
                <button class="w3-green w3-padding" onclick="train()">Train</button>
                <button class="w3-yellow w3-padding" onclick="predict()">Predict</button>
            </div>
            <div id="evaluation">
                <p class="w3-red">Status: </p>
                <h2 class="w3-text-green">Evaluation Result</h2>
                <ul class="">
                    <li>Type of Specimen:</li>
                    <li>Content A:</li>
                    <li>Content B:</li>
                    <li>Content C:</li>
                </ul>
            </div>

        </div>



        <!-- <button id="randomizeData">Randomize Data</button> -->

        <!-- W3 Modal for Login Form -->

        <div id="login" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

                <div class="w3-center"><br>
                    <span onclick="document.getElementById('login').style.display='none'"
                        class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                </div>
                <div class="w3-panel w3-red" id="login_error" style="display: none;">
                    <h3>Opps!</h3>
                    <p>You're not a member.</p>
                </div>

                <form class="w3-container">
                    <div class="w3-section">
                        <label><b>Username</b></label>
                        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username"
                            name="username" id="username" required>
                        <label><b>Password</b></label>
                        <input class="w3-input w3-border" type="password" placeholder="Enter Password" name="password"
                            id="password" required>
                        <input class="w3-check w3-margin-top" type="checkbox" name="remember" id="remember"> Remember me
                        <button class="w3-button w3-block w3-green w3-section w3-padding" type="button"
                            onclick="login()">Login</button>

                    </div>
                </form>

                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button onclick="document.getElementById('login').style.display='none'" type="submit"
                        class="w3-button w3-red">Cancel</button>
                    <span class="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>
                </div>

            </div>
        </div>

        <!-- End of Login Form -->

        <!-- W3 Modal for Log-out Form -->

        <div id="logout" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

                <div class="w3-center"><br>
                    <span onclick="document.getElementById('logout').style.display='none'"
                        class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                </div>

                <form class="w3-container">
                    <div class="w3-section">
                        <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit"
                            onclick="logout()">Logout</button>
                    </div>
                </form>

                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button onclick="document.getElementById('login').style.display='none'" type="button"
                        class="w3-button w3-red">Cancel</button>
                    <span class="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>
                </div>

            </div>
        </div>

        <!-- End of log-out Form -->

        <!-- W3 Modal for Terminal Log -->

        <div id="terminal" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

                <div class="w3-center"><br>
                    <span onclick="document.getElementById('terminal').style.display='none'"
                        class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                </div>
                <div class="w3-container">
                    <h1 class="w3-text-blue">Console log</h1>

                    <label>Logs</label>
                    <textarea class="w3-input" rows="5" id="rxConsole"></textarea>

                </div>
                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button onclick="document.getElementById('terminal').style.display='none'" type="button"
                        class="w3-button w3-red">Close</button>
                    <span class="w3-right w3-padding w3-small"><button
                            class="fa fa-save w3-padding-small w3-green"></button>&nbsp;Save as txt?</span>
                </div>

            </div>
        </div>

        <!-- End of Terminal Log -->

        <!-- W3 Modal for Machine Learing Log -->

        <div id="trainning" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

                <div class="w3-center"><br>
                    <span onclick="document.getElementById('trainning').style.display='none'"
                        class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                </div>
                <div class="w3-panel w3-red" id="trainning_error" style="display: none;">
                    <h3>Opps!</h3>
                    <p>Something wrong happened.</p>
                </div>
                <div class="w3-panel w3-green" id="trainning_done" style="display: none;">
                    <h3>WOW!</h3>
                    <p>Finnish, why don't you give a try?</p>
                </div>
                <div class="w3-container">
                    <h1 class="w3-text-blue">Make me more Smarter</h1>

                    <label class=""><b>Upload Trainning datasets</b></label>
                    <input class="w3-input w3-border" type="file" name="trainning_data" id="trainning_data"
                        placeholder="datasets.csv" accept=".csv, .json" required>

                    <label class=""><b>Learning Rate</b></label>
                    <input class="w3-input w3-border" type="number" name="learning_rate" id="learning_rate"
                        placeholder="0.5">
                    <label class=""><b>Epochs</b></label>
                    <input class="w3-input w3-border" type="number" name="epochs" id="epochs" placeholder="5">

                    <input class="w3-check" type="checkbox" name="shuffle" id="shuffle" checked="checked">
                    <label>Shuffle</label>

                    <p>
                        <button class="w3-btn w3-teal" id="train" onclick="train()">Train</button>
                        <span class="w3-right w3-padding w3-small" id="trainning_status">Status: N/A</span>
                    </p>

                </div>
                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button onclick="document.getElementById('trainning').style.display='none'" type="button"
                        class="w3-button w3-red">Close</button>
                    <span class="w3-right w3-padding w3-small"><button
                            class="fa fa-save w3-padding-small w3-green"></button>&nbsp;Save as txt?</span>
                    <span class="w3-right w3-padding w3-small"><button
                            class="fa fa-check w3-padding-small w3-blue"></button>&nbsp;Apply tranning?</span>
                </div>

            </div>
        </div>

        <!-- End of Machine Learning -->

        <!-- W3 Modal for Report Generation -->

        <div id="report" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

                <div class="w3-center"><br>
                    <span onclick="document.getElementById('report').style.display='none'"
                        class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                </div>
                <div class="w3-panel w3-red" id="report_error" style="display: none;">
                    <h3>Opps!</h3>
                    <p>Something wrong happened.</p>
                </div>
                <div class="w3-panel w3-green" id="report_done" style="display: none;">
                    <h3>HORRY!</h3>
                    <p>Wait for a while, i'm preparing your data.</p>
                </div>
                <div class="w3-container">

                    <h1 class="w3-text-blue">Report</h1>

                </div>
                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button onclick="document.getElementById('report').style.display='none'" type="button"
                        class="w3-button w3-red">Close</button>
                    <span class="w3-right w3-padding w3-small"><button
                            class="fa fa-download w3-padding-small w3-green"></button>&nbsp;Download as PDF?</span>
                    <span class="w3-right w3-padding w3-small"><button
                            class="fa fa-upload w3-padding-small w3-blue"></button>&nbsp;Upload to Cloud Pool?</span>
                </div>

            </div>
        </div>

        <!-- End of Report Generation -->


        <!-- W3 Modal for Data Labeling  -->

        <div id="labeling" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

                <div class="w3-center"><br>
                    <span onclick="document.getElementById('labeling').style.display='none'"
                        class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                </div>
                <div class="w3-panel w3-red" id="report_error" style="display: none;">
                    <h3>Opps!</h3>
                    <p>Something wrong happened.</p>
                </div>
                <div class="w3-panel w3-green" id="report_done" style="display: none;">
                    <h3>HORRY!</h3>
                    <p>Wait for a while, i'm preparing your data.</p>
                </div>
                <div class="w3-container">
                    <h1 class="w3-text-blue">Data Labeling</h1>
                    <div class="chart-container" style="position: relative; height:40vh; width:100%"
                        id="labeling_line_graph">
                        <canvas id="labeling_chart"></canvas>
                    </div>
                    <p>
                        <button class="w3-button w3-blue-gray" id="" onclick="scan('#')"><label>Scan</label></button>
                    </p>
                    <div class="w3-center">

                        <input class="w3-radio" type="radio" name="label" value="0">
                        <label class="w3-text-blue">Unknown</label>

                        <input class="w3-radio" type="radio" name="label" value="1" checked>
                        <label class="w3-text-green">Ripe</label>

                        <input class="w3-radio" type="radio" name="label" value="2">
                        <label class="w3-text-pink">Matured</label>

                        <input class="w3-radio" type="radio" name="label" value="3">
                        <label class="w3-text-blue">Prematured</label>

                        <button type="w3-button w3-red" onclick="findLabel()">
                            Submit
                        </button>
                    </div>
                    <p>
                        <button class="w3-btn w3-teal" id="train" onclick="train()">Train</button>
                        <span class="w3-right w3-padding w3-small" id="trainning_status">Status: N/A</span>
                    </p>

                </div>
                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button onclick="document.getElementById('labeling').style.display='none'" type="button"
                        class="w3-button w3-red">Close</input>
                        <span class="w3-right w3-padding w3-small"><button
                                class="fa fa-download w3-padding-small w3-green"></button>&nbsp;Download as PDF?</span>
                        <span class="w3-right w3-padding w3-small"><button
                                class="fa fa-upload w3-padding-small w3-blue"></button>&nbsp;Upload to Cloud
                            Pool?</span>
                </div>

            </div>
        </div>

        <!-- End of Report Generation -->

        <!-- W3 Modal for Settings -->

        <div id="setting" class="w3-modal">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

                <div class="w3-center"><br>
                    <span onclick="document.getElementById('setting').style.display='none'"
                        class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
                </div>
                <div class="w3-panel w3-red" id="saving_error" style="display: none;">
                    <h3>Opps!</h3>
                    <p>Something wrong happened.</p>
                </div>
                <div class="w3-panel w3-green" id="saving_done" style="display: none;">
                    <h3>NICE!</h3>
                    <p>I feel something new.</p>
                </div>
                <div class="w3-container">
                    <div class="form-group">
                        <!-- <label for="rxConsole">Settings:</label>
                    <textarea class="form-control" rows="10" id="rxConsole"></textarea> -->
                        <div class="w3-container">
                            <h1 class="w3-text-blue">Settings</h1>
                            <!-- <p>Number of Samples</p> -->
                            <label class=""><b>Number of Samples</b></label>
                            <select class="w3-select" name="sampling" id="sampling" required>
                                <option value="1" disabled selected>Choose your sample count per scan</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <p>Note: The Higher the sample the slower</p>
                            <label class=""><b>Gain</b></label>
                            <select class="w3-select" name="gain" id="gain" required>
                                <option value="3" disabled selected>Select your desired gain</option>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                            <p>Note: The Higher the gain the higher the sensitiviy</p>
                            <label class=""><b>Measurement Mode</b></label>
                            <select class="w3-select" name="measurement_mode" id="measurement_mode">
                                <option value="2" disabled selected>Choose your Measurement Mode</option>
                                <option value="0">Option 1</option>`
                                <option value="1">Option 2</option>
                                <option value="2">Option 3</option>
                            </select>
                            <p>Note: The Higher the sample the slower</p>
                            <label class=""><b>Company</b></label>
                            <input class="w3-input w3-border" type="text" placeholder="Company name" id="company_name"
                                required>

                            <label class=""><b>License Code</b></label>
                            <input class="w3-input w3-border" type="text" placeholder="0X-1E2I91" id="license_code"
                                required>

                            <input class="w3-check w3-margin-top" type="checkbox" checked name="with_bulb"
                                id="with_bulb">With Bulb
                            <input class="w3-check w3-margin-top" type="checkbox" checked name="show_graph"
                                id="show_graph">Show Line Graph
                            <input class="w3-check w3-margin-top" type="checkbox" checked name="show_misc"
                                id="show_misc">Show Misc.
                            <p class="w3-padding">
                                <button class="w3-btn w3-teal" onclick="save_setting()"
                                    id="save_setting_btn">Save</button>
                                <button id="reconnect" onclick="connect()" type="button" class="w3-button w3-red"
                                    id="connect_btn">Re/Connect</button>
                                <span class="w3-right w3-padding w3-small" id="connection_status">Status: Not
                                    Connected</span>
                            </p>
                        </div>

                    </div>

                    <div>
                    </div>
                </div>
                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button onclick="document.getElementById('setting').style.display='none'" type="button"
                        class="w3-button w3-red">Close</button>
                    <!-- <span class="w3-right w3-padding w3-hide-small"><button class="fa fa-download w3-padding-small w3-green"></button>&nbsp;Download as PDF?</span> -->
                    <span class="w3-right w3-padding w3-small"><button
                            class="fa fa-check-circle-o w3-padding-small w3-blue" id="apply_setting_btn"
                            onclick="load_setting()"></button>&nbsp;Apply Changes?</span>
                </div>

            </div>
        </div>

        <!-- End of Settings -->
    </div>
<script src="./assets/js/controller.js"></script>

</html>