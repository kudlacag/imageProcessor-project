# Starting the project

first you have to run npm install
after that you can easily run the project with npm run start

# URL

first look the images/imagesFull folder and use exactly the filenames like icelandwaterfall and any ather file in that folder

please use the url as fellows
if you want to resize a photo url looks like
localhost:3000/image?filename=icelandwaterfall&width=300&height=300

if you want to delete a foto in thumb folder please
wright like this as example
http://localhost:3000/image/delete?filename=icelandwaterfall&width=300&height=300

if you want to test a false filename or false path you can write like this
localhost:3000/image?filename=nofilename&width=300&height=300
or just do not write image or height

# Testing

you can look at the package.json file,
there you will find all scripts to start server to test and for eslint and prettier ofcourse
