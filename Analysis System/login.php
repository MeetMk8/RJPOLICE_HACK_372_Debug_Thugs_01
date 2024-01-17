<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
    <title>Login Form</title>
    <style>
    .main{
        text-align : center ;
        font-size : 32px;
        color : purple;
        margin-top : 20px;
        margin-bottom : 0px;
    }
</style>
</head>

<body>
<div class="main">Analysis System</div>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
					<?php
						require_once("conn.php");
						if(isset($_POST["btnsubmit"])){
							$Uname = $_POST["txtname"];
							$Pass = $_POST["txtpass"];
							
							if($con->connect_error){
								die("Failed to Connect :".$con->connect_error);
							}
							else{
								$query = "Select * from district where Name = '$Uname'";
                                $data = mysqli_query($con,$query);
								if($data->num_rows > 0){
									$final_data = $data->fetch_assoc();
									if($final_data['district_Password'] === $Pass){
										header('Location:ana.php');
									}else{
										echo '<script>alert("Invalid Username or Password")</script>';

									}
								}else{
									echo '<script>alert("Invalid Username or Password")</script>';
								}
							}
						}
					?>
                    <div class="card-body">
                        <form method="post" action="ana.php">
                            <div class="form-group">
                                <label for="username">Username:</label>
                                <input type="text" class="form-control" id="username" name="txtname" placeholder="Enter username" name="txtname">
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" id="password" name="txtpass" placeholder="Enter password" name="txtpassword">
                            </div>
                            <input type="submit" class="btn btn-primary" name="btnsubmit"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and Popper.js (optional) -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
</body>

</html>
