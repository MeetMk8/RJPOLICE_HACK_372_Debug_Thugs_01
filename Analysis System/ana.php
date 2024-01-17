<?php
    require_once("conn.php");
    $textboxData = ""; 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Retrieve the data from the form
        $textboxData = $_POST["txtname"];
        
    }
    $query = "Select * from feedback_complaint where district = '$textboxData' ";
    $result = mysqli_query($con,$query);
    
   
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <title>Data Table View</title>

    <!-- <script>
    $(document).ready(function(){
        $("#submitButton").click(function(){
            var rowCount = $("#data-table tr").length;
            alert(rowCount); // Outputs: 4
        });
    }); 
</script> -->
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
    <div class="container-fluid mt-5">
        
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0 d-flex align-items-center">
                            <i class="fas fa-table mr-2"></i> Data Table View
                        </h4>
</div>
                    <form action="" method="post">
                    <div class="card-body">
                        
                            
                        </div>
                        
                        <div class="card-body">
                        <div class="table-responsive">
                            <table id="data-table" class="table table-bordered table-hover">
                                <thead class="thead-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>district</th>
                                        <th>subdistrict</th>
                                        <th>name</th>
                                        <th>email</th>
                                        <th>contac</th>
                                        <th>description</th>
                                        <th>feedbackdate</th>
                                        <th>Residental_Address</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                    <!-- Data will be inserted here dynamically -->
                                    <tr>
                                    <?php 
                                        while($row = mysqli_fetch_assoc($result))
                                        {
                                    ?>
                                    <td><?php echo $row['id']; ?></td>
                                    <td><?php echo $row['district']; ?></td>
                                    <td><?php echo $row['subdistrict']; ?></td>
                                    <td><?php echo $row['name']; ?></td>
                                    <td><?php echo $row['email']; ?></td>
                                    <td><?php echo $row['contact']; ?></td>
                                    <td><?php echo $row['description']; ?></td>
                                    <td><?php echo $row['feedbackdate']; ?></td>
                                    <td><?php echo $row['Residental_Address']; ?></td>
                                    <!-- <td><button type="submit" class="btn btn-success">Accept</button> <button type="submit" class="btn btn-danger">Reject</button></td> -->
                                    </tr>
                                    <?php
                                        }
                                    ?>

                                    
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </form>   
                    </div>
                    <div class="card-footer bg-light text-muted">
                        Footer <span id="last-updated"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and Popper.js (optional) -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

    <!-- Font Awesome JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/js/all.min.js"></script>

    <!-- Date Range Picker JS -->
    <script src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>

    <!-- Custom JavaScript and jQuery -->
    <!-- <script src="main.js"></script> -->
</body>

</html>
