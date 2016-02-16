<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Pdp client</title>
	<link href="style.css" rel="stylesheet">
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
	
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#" ref="Process and find connexes composants"><span class="glyphicon glyphicon-tasks"></span></a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li>
						<a href="#">
							<label>
								<input type="checkbox" id="baseline">  Show Baseline
							</label>
						</a>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li>
						<a href="#"><span class="glyphicon glyphicon-save" aria-hidden="true"></span></a>
					</li>
					<li>

						<a href="#popup" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-trash" id="button_trash" aria-hidden="true"></span></a>

					</li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="row processing">

		<div class="left col-md-8">
			<div class="zoom-icon">
				<span class="glyphicon glyphicon-zoom-in" id="zoom-in"></span><br>
				<span class="glyphicon glyphicon-zoom-out" id="zoom-out"></span><br>
				<span class="glyphicon glyphicon-repeat" id="zoom-reset"></span>
			</div>

			<canvas id="canvas" width="500" height="500" data-girar="0"></canvas>
			<img class="loader" src="img/loader.gif">
			<form enctype="multipart/form-data" action="" method="post" class="upload_image">

				<input type="hidden" name="MAX_FILE_SIZE" value="52428800" />
				<div class="fileUpload btn btn-primary">
					<span>Upload</span>
					<input type="file" class="upload" name="image"/>
				</div>
			</form>
		</div>
		<div class="right col-md-4" >
			<div class="container_right">
				<button class="buttonPrevious btn btn-primary">Previous</button>
				<button class="buttonNext btn btn-primary">Next</button>

				<div class="small-canvas">
					<div class="content">
						<canvas id="small_canvas" data-girar="500"></canvas>
					</div> 
				</div>



				<div class="container_option_base">
					<div class="row">
					  
			      <div class="input-group col-sm-6 col-sm-offset-3">
			        <input class="form-control" type="text" value="" placeholder="" name="q">
			        <div class="input-group-btn">
			          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span id="mydropdowndisplay">Letter</span> <span class="caret"></span></button>
			          <ul class="dropdown-menu" id="mydropdownmenu">
			            <li><a href="#">Letter</a></li>
			            <li><a href="#">Unicode</a></li>
			          </ul>
			          <input type="hidden" id="mydropwodninput" name="category">
			        </div><!-- /btn-group -->
			      </div>
					</div>

					<div class="field_modification_base">
						<div class="row">
						  <div class="form-group col-sm-5 col-sm-offset-1">
						  	<div class="group">
						  		<label class="sr-only" for="up"></label>
							    <div class="input-group">
							      <div class="input-group-addon">Up</div>
							      <input type="number" step="0.1" class="form-control" id="up">
							    </div>
						  	</div> 
						  </div>
						  <div class="form-group col-sm-5">
						    <label class="sr-only" for="down"></label>
						    <div class="input-group">
						      <div class="input-group-addon">Down</div>
						      <input type="number" step="0.1" class="form-control" id="down">
						    </div>
						  </div>
						</div>		
						<div class="row">
						  <div class="form-group col-sm-5 col-sm-offset-1">
						    <label class="sr-only" for="left"></label>
						    <div class="input-group">
						      <div class="input-group-addon">Left</div>
						      <input type="number" step="0.1" class="form-control" id="left">
						    </div>
						  </div>
						  <div class="form-group col-sm-5">
						    <label class="sr-only" for="up"></label>
						    <div class="input-group">
						      <div class="input-group-addon">Right</div>
						      <input type="number" step="0.1" class="form-control" id="right">
						    </div>
						  </div>
						</div>		
					</div>
					<p>
					  <button type="button" class="btn btn-primary">Save changes</button>
					  <button type="button" class="btn btn-default">Cancel</button>
					</p>
				</div>
			</div>

		</div>
		<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Reset</h4>
					</div>
					<div class="modal-body">
						<p>Are you really sure to reset?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button id="valid-reset" type="button" class="btn btn-primary">Yes</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->

		</div>

	</div>
	<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.0.min.js" ></script>
	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" ></script>
	<script type="text/javascript" src="manipulate_canvas.js" ></script>
	<script type="text/javascript" src="init.js" ></script>
	<script type="text/javascript" src="upload_file.js" ></script>

</body>
</html>