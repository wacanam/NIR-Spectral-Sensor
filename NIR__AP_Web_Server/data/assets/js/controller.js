const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var responseJSON = JSON.parse(xhttp.responseText);
                if (responseJSON.event == "save_setting") {
                    if (responseJSON.status == "error") {
                        document.getElementById('saving_error').style.display = 'block';
                        hideNotif('saving_error', 5000);
                    } else load_setting();
                }
                if (responseJSON.event == "load_setting") {
                    if (responseJSON.status == "error") {
                        document.getElementById('saving_error').style.display = 'block';
                        hideNotif('saving_error', 5000);
                    } else {
                        document.getElementById('saving_done').style.display = 'block';
                        hideNotif('saving_done', 5000);
                        apply_setting();
                    }
                }
                if (responseJSON.event == "login") {
                    if (responseJSON.status == "error") {
                        document.getElementById('login_error').style.display = 'block';
                        hideNotif('login_error', 5000);
                        // handle Error
                    } else if (responseJSON.status == 0) {
                        document.getElementById('login_error').style.display = 'block';
                        hideNotif('login_error', 5000);
                        // handle false
                    } else if (responseJSON.status == 1 && responseJSON.remember == 0) {
                        // handle true
                        console.log("true,false");
                        if (typeof (Storage) !== "undefined") {
                            sessionStorage.setItem("username", responseJSON.username);
                            sessionStorage.setItem("password", responseJSON.password);
                            window.location.reload();
                        } else {
                            document.getElementById("result").innerHTML =
                                "Sorry, your browser does not support Web Storage...";
                        }
                    } else if (responseJSON.status == 1 && responseJSON.remember == 1) {
                        // handle true
                        console.log("true,true");
                        if (typeof (Storage) !== "undefined") {
                            localStorage.setItem("username", responseJSON.username);
                            localStorage.setItem("password", responseJSON.password);
                            window.location.reload();
                        } else {
                            document.getElementById("result").innerHTML =
                                "Sorry, your browser does not support Web Storage...";
                        }
                    } else {
                        // default
                        console.log("walang nang yari");
                    }
                }

            }
        };

        function hideNotif(id, interval) {
            setTimeout(function () {
                document.getElementById(id).style.display = 'none';
            }, interval);
        }

        function login() {
            var formData = new FormData();

            formData.append("username", document.getElementById("username").value);
            formData.append("password", document.getElementById("password").value);
            formData.append("remember", document.getElementById("remember").value);

            xhttp.open("POST", "http://"+window.location.hostname+"/login", true);
            xhttp.send(formData);
        }

        function logout() {
            sessionStorage.clear();
            localStorage.clear();
            window.location.reload();
        }

        function train() {
            var formData = new FormData();

            formData.append("learning_rate", document.getElementById("learning_rate").value);
            formData.append("epochs", document.getElementById("epochs").value);
            formData.append("shuffle", document.getElementById("shuffle").value);

            xhttp.open("POST", "http://"+window.location.hostname+"/train", true);
            xhttp.send(formData);
        }

        function save_setting() {
            var formData = new FormData();

            formData.append("sampling", document.getElementById("sampling").value);
            formData.append("gain", document.getElementById("gain").value);
            formData.append("measurement_mode", document.getElementById("measurement_mode").value);
            formData.append("company_name", document.getElementById("company_name").value);
            formData.append("license_code", document.getElementById("license_code").value);
            formData.append("with_bulb", document.getElementById("with_bulb").checked ? 1 : 0);
            formData.append("show_graph", document.getElementById("show_graph").checked ? 1 : 0);
            formData.append("show_misc", document.getElementById("show_misc").checked ? 1 : 0);
            // formData.append("email", document.getElementById("shuffle").value);
            // document.getElementById("line_graph").style.display = (document.getElementById("show_graph").checked) ? 'block': 'none' ;
            // document.getElementById("evaluation").style.display = (document.getElementById("show_misc").checked) ? 'block': 'none' ;

            xhttp.open("POST", "http://"+window.location.hostname+"/save_setting", true);
            xhttp.send(formData);
        }

        function load_setting() {
            xhttp.open("POST", "http://"+window.location.hostname+"/load_setting", true);
            xhttp.send();
        }


        let spectral_data, logger;
        let Socket;
        let input;

        function apply_setting() {
            // formData.append("email", document.getElementById("shuffle").value);
            document.getElementById("line_graph").style.display = (document.getElementById("show_graph").checked) ?
                'block' : 'none';
            document.getElementById("evaluation").style.display = (document.getElementById("show_misc").checked) ?
                'block' :
                'none';
        }
        var chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        var colorNames = Object.keys(chartColors);

        function log(data) {
            var timestamp = Date.parse(Date(Date.now()));
            logger += timestamp + " :" + data + "\n";
            document.getElementById("rxConsole").value += timestamp + " :" + data + "\n";
        }

        function connect() {
            // Socket = new WebSocket('ws://192.168.1.2:81/');
            Socket = new WebSocket('ws://' + window.location.hostname + ':81/');
            Socket.onopen = function () {
                // subscribe to some channels
                document.getElementById("connection_status").innerHTML = "Status: Connected to: " + window.location
                    .hostname + ':81/';
                // alert('Socket is Connected to: ' + window.location.hostname + ':81/');
                Socket.send(JSON.stringify({
                    "status": "connected"
                }));
                console.log('Connected to: ' + window.location.hostname + ':81/')
                log('Connected to: ' + window.location.hostname + ':81/');
                document.getElementById('reconnect').disabled = true;
            };

            Socket.onmessage = function (e) {
                // console.log('Message:', e.data);
                spectral_data = JSON.parse(e.data);
                // console.log(spectral_data);
                let data = [
                    spectral_data.Ch1,
                    spectral_data.Ch2,
                    spectral_data.Ch3,
                    spectral_data.Ch4,
                    spectral_data.Ch5,
                    spectral_data.Ch6,
                ];
                console.log(data);
                if (spectral_data.dist == 'labeling') {
                    addDataset(labelingChart, "Scanned", data)
                    input = tf.tensor2d([
                        [
                            spectral_data.Ch1,
                            spectral_data.Ch2,
                            spectral_data.Ch3,
                            spectral_data.Ch4,
                            spectral_data.Ch5,
                            spectral_data.Ch6,
                        ]
                    ]);

                } else {
                    addDataset(predictionChart, "Scanned", data)
                    input = tf.tensor2d([
                        [
                            spectral_data.Ch1,
                            spectral_data.Ch2,
                            spectral_data.Ch3,
                            spectral_data.Ch4,
                            spectral_data.Ch5,
                            spectral_data.Ch6,
                        ]
                    ]);
                    predict()
                };
                log("Message -" + spectral_data);


            };

            Socket.onclose = function (e) {
                document.getElementById("connection_status").innerHTML = "Status: Disconnected";
                alert('Socket is closed. Reconnect will be attempted in 5 second.', e.reason);
                console.log('Socket is closed. Reconnect will be attempted in 5 second.', e.reason);
                log('Socket is closed. Reconnect will be attempted in 5 second.');
                document.getElementById('reconnect').disabled = false;
                setTimeout(function () {
                    console.log("Reconnecting!!!");
                    log('Reconnecting!!!');
                    connect();
                }, 5000);
            };

            Socket.onerror = function (err) {
                document.getElementById("connection_status").innerHTML = "Status: Disconnected w/ Error";
                log('Socket encountered error: ' + err.message + ' Closing socket');
                alert('Socket encountered error: ', err.message, 'Closing socket');
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                Socket.close();
            };
        }

        function findLabel() {
            let args;
            const ele = document.getElementsByName('label');
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    args = i;
            }
            fit(input, label(args));
        }

        function label(args) {
            let ys;
            switch (args) {
                case 1:
                    ys = tf.tensor2d([
                        [0, 0, 1]
                    ])
                    break;
                case 2:
                    ys = tf.tensor2d([
                        [0, 1, 0]
                    ])
                    break;
                case 3:
                    ys = tf.tensor2d([
                        [0, 1, 1]
                    ])
                    break;
                default:
                    ys = tf.tensor2d([
                        [0, 0, 0]
                    ])
                    break;
            }
            return ys;

        }

        function sendText() {
            var msg = document.getElementById("txBar").value;
            Socket.send(msg);
            log("Sending Data -" + msg);
            document.getElementById("txBar").value = "";
        }

        function scan(args) {
            if (args == '#') {
                Socket.send("#")
                removeDataset(labelingChart);
            } else {
                Socket.send("*");
            }
            Socket.send(JSON.stringify({
                "command": "scan"
            }));
            log("Scanning");
        }

        // function train() {
        //     Socket.send(JSON.stringify({
        //         "command": "train"
        //     }));
        //     log("Trainning");
        // }

        function sendBrightness() {
            var value = document.getElementById("brightness").value;
            Socket.send("#" + value);
            Socket.send(JSON.stringify({
                "command": "set",
                "param": "brightness",
                "value": value
            }));
            log("Setting Brightness -" + value);
        }
        //connect();
        var config = {
            type: 'line',
            data: {
                labels: ['610nm', '680nm', '730nm', '780nm', '810nm', '860nm'],
                datasets: [],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Spectral Data of Durian Fruit'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'NIR Channels'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };
        window.onload = function () {

            load_setting();
            connect();
            if (typeof (Storage) != "undefined") {
                if (localStorage.getItem("username") || sessionStorage.getItem("username")) {
                    document.getElementById('login_tab').style.display = 'none';
                    document.getElementById('train_tab').style.display = 'block';
                    document.getElementById('report_tab').style.display = 'block';
                    document.getElementById('data_tab').style.display = 'block';
                    document.getElementById('scan_tab').style.display = 'block';
                    document.getElementById('terminal_tab').style.display = 'block';
                    document.getElementById('setting_tab').style.display = 'block';
                    document.getElementById('logout_tab').style.display = 'block';
                    document.getElementById('non_member').style.display = 'none';
                } else {
                    document.getElementById('login_tab').style.display = 'block';
                    document.getElementById('train_tab').style.display = 'none';
                    document.getElementById('report_tab').style.display = 'none';
                    document.getElementById('data_tab').style.display = 'none';
                    document.getElementById('scan_tab').style.display = 'none';
                    document.getElementById('terminal_tab').style.display = 'none';
                    document.getElementById('logout_tab').style.display = 'none';
                    document.getElementById('setting_tab').style.display = 'none';
                }
            }
            //HOME MAIN Chart
            const predictChart = document.getElementById('predictionChart').getContext('2d');
            predictionChart = new Chart(predictChart, config);
            log("Creating Home Line chart");

            //Labeling Chart
            const labelChart = document.getElementById('labeling_chart').getContext('2d');
            labelingChart = new Chart(labelChart, config);
            log("Creating Labeling Line chart");
        };

        function addDataset(chart, label, data) {
            log("Adding Dataset");
            const colorName = colorNames[config.data.datasets.length % colorNames.length];
            const newColor = window.chartColors[colorName];
            const newDataset = {
                label: 'Dataset ' + config.data.datasets.length,
                backgroundColor: newColor,
                borderColor: newColor,
                data: data,
                fill: false
            };

            for (var index = 0; index < config.data.labels.length; ++index) {
                newDataset.data.push(randomScalingFactor());
            }

            config.data.datasets.push(newDataset);
            chart.update();
        }

        function removeDataset(chart) {
            log("Removing Dataset");
            config.data.datasets.splice(config.data.datasets.length - 1, 1);
            chart.update();
        }

        function randomScalingFactor() {
            return Math.random(0, 1000);
        };

        function w3_open() {
            document.getElementById("mySidebar").style.display = "block";
        }

        function w3_close() {
            document.getElementById("mySidebar").style.display = "none";
        }

        // Machine Learning by TensorFlow.js

        const model = tf.sequential();
        // First layer must have an input shape defined.
        const hidden1 = tf.layers.dense({
            units: 32,
            inputShape: [6],
            activation: "sigmoid",
            useBias: true
        })
        const hidden2 = tf.layers.dense({
            units: 32,
            activation: "sigmoid",
            useBias: true
        })
        const output = tf.layers.dense({
            units: 3,
            activation: 'sigmoid',
            useBias: true
        })

        model.add(hidden1);
        model.add(hidden2);
        model.add(output);


        const optimizer = tf.train.sgd(0.199);

        model.compile({
            optimizer: optimizer,
            loss: 'meanSquaredError'
        });

        let xs = tf.tensor2d([
            [0, 0, 0, 0, 0, 0]
        ]);

        const ys = tf.tensor2d([
            [0, 0, 0]
        ]);



        // train().then(() => {
        //     let outputs = model.predict(input);
        //     outputs.abs().round().print()
        //     console.log("Trainning Complete!");
        // });

        function predict() {
            let outputs = model.predict(input);
            outputs.abs().round().print();
        }

        async function fit(xs, ys) {
            const response = await model.fit(xs, ys);
            console.log(response.history.loss[0]);
        }

        async function train() {
            for (let i = 0; i <= 10; i++) {
                const training_setting = {
                    shuffle: true,
                    epochs: 10
                };
                const response = await model.fit(xs, ys, training_setting);
                console.log(response.history.loss[0]);
            }
        }

        // let outputs = model.predict(input);
        // outputs.print();