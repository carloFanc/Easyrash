<?php
 if(!extension_loaded('openssl'))
    {
        throw new Exception('This app needs the Open SSL PHP extension.');
    } 
 ?>