<?php

use Illuminate\Database\Seeder;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        define('title', 'title');
        define('body',  'body');
        define('author', 'author');

        DB::table('entries')->insert(array(
            array(
                title   => 'Cộng đồng kêu gọi giúp đỡ cụ bà mù, cụt chân đang thoi thóp vì vết thương lở loét',
                body    => '<b>Cụ bà 85 tuổi đau đớn vì vết thương lở loét</b>
<p>Mới đây, trên trang Facebook của nhóm thiện nguyện Đà Nẵng đăng tải hình ảnh một cụ bà tàn tật đang thoi thóp trên chiếc giường tre mục nát đã gây sự chú ý của cộng đồng mạng và khiến nhiều người không khỏi xót xa.</p>
<p>Đó là hoàn cảnh của cụ bà Nguyễn Thị Ân (tên thường gọi là cụ Cư, 85 tuổi), trú tại thôn Xuân Ngọc 1, xã Tam Anh Nam, huyện Núi Thành, tỉnh Quảng Nam. </p>
<p>Theo ông Võ Đăng Ngọc, Trưởng thôn Xuân Ngọc 1, nơi cụ Ân sống là một căn nhà cấp 4 cũ kỹ, đã xuống cấp trầm trọng. Trong căn nhà trống chẳng có vật dụng gì đáng giá ngoài chiếc giường tre tồi tàn, mục nát và cái nồi cơm điện cũ kỹ lúc nấu được lúc không.</p>
<p>Chồng cụ Ân mất sớm, từ đó cụ phải một mình gồng gánh nuôi 3 đứa con thơ dại. Rồi khó khăn cũng dần qua đi khi 2 đứa con trai và 1 đứa con gái của cụ trưởng thành, nhưng rồi họ đều lập gia đình và hiện hoàn cảnh cũng đang khó khăn nên không thể giúp đỡ được cho mẹ nhiều... Không chỉ vậy, con gái của cụ là bà Bùi Thị Hằng (56 tuổi) cũng đang phải nằm viện vì bị suy tim, phù thận nhưng không có tiền điều trị… </p>
<p>Được biết, cách đây khoảng 50 năm, do bị trúng bom đạn khiến cụ Ân bị cụt chân phải, tay phải bị cong queo và đôi mắt mãi không thấy được ánh sáng. Không có khả năng lao động nên suốt mấy chục năm qua, cuộc sống của cụ Ân chỉ biết dựa vào số tiền trợ cấp cho người tàn tật và sự thương tình, giúp đỡ của hàng xóm, láng giềng. </p>
                ',
                author  => 1
            ),
            array(
                title   => 'Introduction to Backbone.js',
                body    => '<p>The single page ecosystem has exploded in the last couple of years. There are dozens of frameworks available to build single page apps. Apart from Backbone.js, Ember.js, Knockout.js and AngularJS by Google are some of the other popular alternatives. If you are still deciding on which framework to use, you have a tough job ahead! Every framework has it\'s pros and cons and there are many comparisons available on the internet.</p>
<h4>Why we picked Backbone.js</h4>
<p>When starting work on SupportBee\'s frontend, we started exploring client side MVC frameworks and started exploring the choices available back then (late 2010). On one end, there were big frameworks like ExtJS and SproutCore that offered the MVC structure, widgets and many other components. On the other end were simple MVC frameworks like Backbone.js and Knockout.js that provided just enough structure to your application and got out of the way. Coming from a jQuery background and having witnessed the jQuery plugin ecosystem, we decided to opt for the simpler MVC frameworks for structuring code and sticking with jQuery plugins for additional functionality. This way we could avoid any kind of lock in and pick and choose the components we needed based on the functionality and quality of documentation.</p>
<h4>A quick walkthrough of the framework</h4>
<p>If you are new to Backbone.js, there are some really great tutorials and books out there.Backbone.js Wiki has a page full on tutorials and books and serves as a great starting point. If you have any favorites, please leave the links in the comments.
If you have looked at Backbone.js before, this short introduction should suffice for you. Let\'s get started!
In their own words,
<pre>Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.</pre></p>
<p>Let\'s go over the main components of Backbone.js (in the order that they are introduced in, in the official documentation)</p>
<h4>Events</h4>
<p>Events are at the heart of Backbone.js and any well designed single page app. By mixing in the Events module, almost any object can dispatch and listen to events. Out of the box Models, Views and Controllers can dispatch and listen to events. There are several pre-defined events in Backbone.js and you can (and you should, as we will see later) define and dispatch custom events. Let\'s look at a quick example (taken from the Backbone.js documentation)</p>',
                author  => 1
            )
        ));
    }
}
