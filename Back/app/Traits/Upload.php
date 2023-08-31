<?php

namespace App\Traits;


trait Upload
{

    protected function upload($file)
    {
       return  $file->file('photo')->store('public/images');
    }
}

