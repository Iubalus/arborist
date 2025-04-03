# Arborist <img src="arborist.png" width="150" align="left">

Create an intuitive tool for putting data into trees. More detail pending. For now here's a funny logo.


### Test to see how the table might behave in markdown

<style>
        .card-content {            
            width: 120px;
            min-height: 100px;
            padding: 20px 10px 10px 10px;
            text-align: center;
            background: rgb(255, 234, 177);
            border-radius: 5px;
            margin: auto;
            position: relative;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
        }

        .card-content .card-title {
            display: block;
            font-weight: bold;
        }

        .card-content .card-author {
            position: absolute;
            top: 2px;
            left: 2px;
            font-size: 10px;
        }

        .card-pre {
            font-family: monospace;
            position: absolute;
            font-size: 40px;
            left: -12px;
            z-index: 10;
            top: 50px;
        }

        .card-post {
            font-family: monospace;
            position: absolute;
            font-size: 40px;
            right: -12px;
            z-index: 10;
            top: 50px;
        }

        .card-content .card-last {
            position: absolute;
            top: 2px;
            right: 2px;
            font-size: 10px;
        }

        td {
            position: relative;
            align-content: baseline;
            padding: 10px;
            border-left: 3px solid #cfcfff;
            border-top: 3px solid #cfcfff;
        }

        td:last-of-type {
            border-right: 3px solid #cfcfff;
        }

        tr:last-of-type td {
            border-bottom: 3px solid #cfcfff;
        }
    </style>
<div id="root">
    <table cellpadding="0" cellspacing="0"><tbody><tr><td colspan="5"><div class="card-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat at nunc et egestas.</div></td></tr><tr><td colspan="4"><div class="card-content"><span class="card-author">Robin</span><span class="card-last">3/31/25 2:54PM</span><span class="card-title">Total</span>1.1</div></td><td><div class="card-content">1.2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat at nunc et egestas.</div></td></tr><tr><td><span class="card-pre">(</span><div class="card-content">A</div><span class="card-post">+</span></td><td colspan="2"><div class="card-content">B</div><span class="card-post">+</span></td><td><div class="card-content">C</div><span class="card-post">)</span></td><td class="empty-cell"></td></tr><tr><td class="empty-cell"></td><td><span class="card-pre">(</span><div class="card-content">1.1.2.1 A</div><span class="card-post">x</span></td><td><div class="card-content">1.1.2.2 B</div><span class="card-post">)</span></td><td><div class="card-content" style="background: rgb(177, 224, 255);">1.1.3.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat at nunc et egestas.</div></td><td class="empty-cell"></td></tr></tbody></table></div>