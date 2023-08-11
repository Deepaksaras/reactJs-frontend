<?php 
date_default_timezone_set("asia/kolkata");
ob_start();
session_start();
$accountUserId=$_SESSION['userid'];
ini_set("display_errors",0);
include("../appforms/includeobd.php");
include_once("../udfclass/dbconn.class.php");
$objDbUtility=new DbUtility();
//$dataServerName="S1";
$isValidInput=true;
$menuCategory=3;
$dataServerName=$objDbUtility->getFieldValue($dbLink,"CallServerName","ivr_cdrstats","WHERE `Active`='1' ORDER BY `CallServerName` DESC",false);
//$dataServerName="";

if(strlen($dataServerName)==0){
	$dataServerName="onex1";
}
if(strlen($dataServerName)>0){
  $arrConnectionDetails=$objDbUtility->getAllFieldValue($dbLink,"`DbServerIp`, `DbUserName`, `DbUserPassword`, `DbName`, `DbTableName`","ivr_dataservermaster","WHERE Active=1 AND ServerName='".$dataServerName."'", true);
  if($arrConnectionDetails==false){
    $code="810"; 
    $info= "system error! contact support.";
  } else {
    $objDbConn=new DbConn($arrConnectionDetails["DbServerIp"],$arrConnectionDetails["DbUserName"],$arrConnectionDetails["DbUserPassword"],$arrConnectionDetails["DbName"]);
    $dbLinkSmpp=$objDbConn->connect();
    if($dbLinkSmpp==false){
      $code="810";
      $info= "Unable to connect to server! contact support.";
      $isValidDataConnection=false;
    } else {
      $isValidDataConnection=true;
    }
  }
}
if(isset($_POST["searchdata"])){
	$startDate=trim($_POST['dates']);
	$summaryDate=date("Y-m-d",strtotime($startDate));

}
else{
//$startDate=date("Y-m-d");
$sumdateQuery="SELECT `SummaryDate` FROM `ivr_cdrstats` ORDER BY SummaryDate DESC limit 1";
$Sumdateresult = mysqli_query($dbLink,$sumdateQuery);
$sumdateRow= mysqli_fetch_assoc($Sumdateresult);
$summaryDate=$sumdateRow['SummaryDate'];
$startDate=date("d-m-Y",strtotime($summaryDate));
}
 $serverNamequery="SELECT DISTINCT CallServerName FROM `ivr_cdrstats` WHERE Active='1' AND SummaryDate='".$summaryDate."' ";
$Serverresult = mysqli_query($dbLink,$serverNamequery);
$servers=[];
while($serverrow = mysqli_fetch_assoc($Serverresult)) {
    $servers[]=$serverrow['CallServerName'];
   
}
//print_r($servers);
$notansArray=array();
$totalArray=array();
$ansArray=array();
$campaigns=array();
$campaignName=array();
$arrnotansArray=array();
$arransArray=array();
$arrAllServerData=array();
$arrDailyCampign =array(8,9,10,11,12,13,14,15,16,17,18,19,20);
foreach($servers as $serverName){
      $grQuery="SELECT `CallServerName`, `SummaryDate`, `HourNum`, `SuccessCallCount`, `FailedCallCount` FROM `ivr_cdrstats` WHERE `SummaryDate`='".$summaryDate."' AND  `CallServerName`='".$serverName."' GROUP BY `HourNum`";
	//echo "<br>";
     if($isValidInput){
         $result = mysqli_query($dbLink,$grQuery);
		if (mysqli_num_rows($result) > 0) {
			// OUTPUT DATA OF EACH ROW
            while($row = mysqli_fetch_assoc($result)) {
                $campaigns[$serverName]=$row['HourNum'];
                $notansArray[$serverName]=$row['FailedCallCount'];
                $ansArray[$serverName]=$row['SuccessCallCount'];
                //$totalArray[]=$row['answered']+$row['failed'];  
                if(in_array($row['HourNum'],$arrDailyCampign)){
                $arrRespnseData[$serverName][] = $row['HourNum'];                   
                }
            }  

             
            $i=0;
            $j=0;   

            foreach($arrDailyCampign as $hour){  
                if(in_array($hour , $arrRespnseData[$serverName])){
                $arrnotansArray[$serverName][$i]=$notansArray[$serverName][$j];
                $arransArray[$serverName][$i]=$ansArray[$serverName][$j];
                //$arrtotalArray[$i]=$totalArray[$j];	
                $j++;		
                }else{
                $arrnotansArray[$serverName][]=0;
                $arransArray[$serverName][]=0;
               // $arrtotalArray[]=0;
                }
            $i++; 
             
            }
		}
       
	}
   
    

}

?>
<!DOCTYPE html>
<html lang="en">
<?php include("../ucontrols/head.php"); ?>
<!-- Custom fonts for this template-->
<link href="../css/fonts/fonts.css" rel="stylesheet">
<link href="../css/iconfont/lnil.css" rel="stylesheet">
<link href="../css/bootstrap-select.css" rel="stylesheet">
<link href="../css/calendar/daterangepicker.css" rel="stylesheet">
<body id="page-top">
<!-- Page Wrapper -->
<div id="wrapper">
<?php include("../ucontrols/dmside.php"); ?>
  <!-- Sidebar -->
	  <!-- Content Wrapper -->
	<div id="content-wrapper" class="d-flex flex-column"> 
		<!-- Main Content -->
		<div id="content" class="page-content-wrapper "> 
			<!-- Begin Page Content -->
			<div class="container-fluid">
        <?php include("../ucontrols/balance.php"); ?>
        <div class="page-title">
          <div class="title-wrap"><h1 class="title is-4"> Live CDR</h1></div>
        </div>					
				<div class="card mb-3">
					<div class="card-body">
						<form class="form-inline" method="POST" >
							<div class="form-group">
								<div class="control has-icon">
									<input type="text" name="dates" id="dates" class="form-control" placeholder="Date" value="<?php echo $startDate;?>" >
									<label class="label form-icon" for="dates"><i class="lnil lnil-calender-alt-1"></i></label>
								</div>
							</div>
							<div class="form-group">
								<button type="submit" class="btn btn-primary btn-icon" name="searchdata" id="searchdata">
                                arrnotansArray				</button>
							</div>
						</form>
					</div>
				</div>		
              <?php for($i=0;$i<count($servers);$i++){?>
				<div class="row mb-3">
					
					<div class="col-md-12">
						<div class="card">
							<div class="card-body">
								<div class="card-header">
								<h5>Campaign Statistics Bar Graph</h5>
								</div>
								<div id=<?php echo "chart$i" ?>>
								</div>
							</div>
						</div>
					</div>					
				</div>	
                <?php } ?>
			</div>
			<!-- /.container-fluid --> 
		</div>
		<!-- End of Main Content --> 
	</div>
	<!-- End of Content Wrapper --> 
</div>
<!-- End of Page Wrapper --> 
<!-- Scroll to Top Button--> 
<a class="scroll-to-top rounded" href="#page-top"> <i class="lnil lnil-arrow-up-circle"></i> </a>
<!-- Modal-->
  <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirm</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Are you sure to hold services for this destination!</div>
        <div class="modal-footer">
          <button class="btn btn-outline-dark" type="button" data-dismiss="modal">No</button>
          <button class="btn btn-primary" type="button">Yes</button>
        </div>
      </div>
    </div>
  </div>
<!-- Bootstrap core JavaScript--> 
<script src="../vendor/jquery/jquery.min.js"></script> 
<script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script> 
<!-- Core plugin JavaScript--> 
<script src="../vendor/jquery-easing/jquery.easing.min.js"></script>
<script type="text/javascript" src="../vendor/select/bootstrap-select.min.js"></script>
<script type="text/javascript" src="../vendor/date/moment.min.js"></script>
<script type="text/javascript" src="../vendor/date/daterangepicker.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

<script>
  $('input[name="dates"]').daterangepicker({
  singleDatePicker:true, 
      locale: {
        format: 'DD-MM-YYYY'
      }   	
	}).on('show.daterangepicker', function (ev, picker) {
		picker.container.find(".calendar-table").show();
 	});
</script>

<script>
    <?php for($a=0;$a<count($servers);$a++){
              $servername=$servers[$a]; ?>
    $(document).ready(function()
    {
        summary(<?php echo json_encode($arrDailyCampign).','.json_encode($arrnotansArray[$servername]).','.json_encode($arransArray[$servername]);?>,'chart<?php echo $a?>');
    });
            
     <?php   }?>
</script>
<script>
 function summary(val,bro,total,id){
    console.log(val);
    console.log(bro);
    console.log(total);
    console.log(id);
  
	var options = {
          series: [ {
          name: 'SuccessCallCount',
          data: total
        }, {
          name: 'FailedCallCount',
          data: bro
        }],		
          chart: {
          type: 'bar',
		  
          height: 250,		
			  toolbar: {
        show: false
        },
		
        },
		legend: {
      show: false
      },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: { 
          categories: val,
        },
        yaxis: {
          title: {
            show: false
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " calls"
            }
          }
        }
        };
        var chart = new ApexCharts(document.querySelector("#"+id), options);
        chart.render();
    }
</script>
<?php include("../ucontrols/footer.php"); ?>
</body>
</html>