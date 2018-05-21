<script>
    <style>
    html, body {
    background-color: #333;
    color: white;
    font-family: monospace;
    margin: 0;
    padding: 0;
}
/* The console container element */
#console {
    height: 400px;
    width: 750px;
    position:relative;
    background-color: black;
    border: 2px solid #CCC;
    margin: 0 auto;
    margin-top: 50px;
}
/* The inner console element. */
.jqconsole {
    padding: 10px;
}
/* The cursor. */
.jqconsole-cursor {
    background-color: gray;
}
/* The cursor color when the console looses focus. */
.jqconsole-blurred .jqconsole-cursor {
    background-color: #666;
}
/* The current prompt text color */
.jqconsole-prompt {
    color: #0d0;
}
/* The command history */
.jqconsole-old-prompt {
    color: #0b0;
    font-weight: normal;
}
/* The text color when in input mode. */
.jqconsole-input {
    color: #dd0;
}
/* Previously entered input. */
.jqconsole-old-input {
    color: #bb0;
    font-weight: normal;
}
/* The text color of the output. */
.jqconsole-output {
    color: white;
}
<body>
<div id=&#34;console&#34;></div>
<script src=&#34;http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js&#34; type=&#34;text/javascript&#34; charset=&#34;utf-8&#34;></script>
    <script src=&#34;../lib/jqconsole.js&#34; type=&#34;text/javascript&#34; charset=&#34;utf-8&#34;></script>
<script>
$(function () {
    var jqconsole = $(&#39;#console&#39;).jqconsole(&#39;Hi\n&#39;, &#39;>>> &#39;);
    var startPrompt = function () {
        // Start the prompt with history enabled.
        jqconsole.Prompt(true, function (input) {
            // Output input with the class jqconsole-output.
            jqconsole.Write(input + &#39;\n&#39;, &#39;jqconsole-output&#39;);
            // Restart the prompt.
            startPrompt();
        });
    };
    startPrompt();
});
</script>

document.write(info)
</script>