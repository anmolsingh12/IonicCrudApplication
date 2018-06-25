<?php
    if(isset($_SERVER['HTTP_ORIGIN']))
    {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    //Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
    {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }

    $postdata = file_get_contents("php://input");
    if(isset($postdata))
    {
        date_default_timezone_set("Asia/Kolkata");
        $request = json_decode($postdata);
        $id = $request->id;
        $name = $request->name;
        $uname = $request->uname;
        $email = $request->email;
        $phone = $request->phone;
         $modified = date('Y-m-d H:i:s');

        // $id='1122334455';
        // $name='Andsjbdhs';
        // $uname='daasas';
        // $email='asv@123';
        //$phone='9931434250';

        if($name != "")
        {
            $con = mysqli_connect("localhost","root","","UserDetails");

            // Check connection
            if (mysqli_connect_errno())
            {
                echo "Failed to connect to MySQL: " . mysqli_connect_error();
            }
            else
            {
                // echo "Id: " .$id;
                // echo "Name: " .$name;
                // echo "Uname: " .$uname;
                // echo "Email: " .$email;
                // echo "Phone: " .$phone;
                // echo "Modified: " .$modified;

                $sql  = "UPDATE users SET name='$name', uname='$uname', email='$email', phone='$phone', modifiedAt='$modified'  WHERE id='$id'";
                $stmt = mysqli_query($con, $sql) or die ("MySQL Error:".mysqli_error($con));

                // echo "successfully inserted !";
            }
        }
        else 
        {
            echo "Empty name and description parameter!";
        }
    }
    else 
    {
        echo "Not called properly with name and description parameter!";
    }
 ?>   