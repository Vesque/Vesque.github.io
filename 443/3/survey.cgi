#!c:/Perl/bin/perl.exe

use Fcntl qw(:flock);
use CGI qw(:all);
use CGI;

my @survey_answers=qw(un deux trois quatre cinq six);

print header;

if(!param || defined param('pageone')) {
	page_one();
}
elsif (defined param('pagetwo')) {
	page_two();
}
elsif (defined param('pagethree')) {
	page_three();
}
elsif (defined param('pagefour')) {
	page_four();
}
elsif (defined param('pagefive')) {
	page_five();
}
elsif (defined param('pagesix')) {
	page_six();
}
elsif (defined param('completed')) {
	survey_complete();
}

sub page_one {
	print "<BODY BGCOLOR = 'ABACEF'>\n";
	print "<FONT COLOR ='000038'>\n";
	print<<END_PAGE_ONE;
<form>
	<h1>1. Please enter your name:</h1>
	<input type="text" name="un"/></br>
	<input type="submit" name="pagetwo" value="Next"/>
</form>
END_PAGE_ONE
}

sub repeat_hidden {
	foreach my $answer ( @survey_answers ) {
		if (defined param($answer)) {
			print "<input type=hidden";
			print " name=\"$answer\" ";
			print " value=\"", param($answer),"\"/>\n";
		}
	}
}

sub page_two {
	print "<BODY BGCOLOR = 'ABACEF'>\n";
	print "<FONT COLOR ='000038'>\n";
	print<<END_PAGE_TWO;
<form>
	<h1>2. Did you find the information included within this web site useful?</h1></br>
	<p>
	<input type="radio" name="deux" value="1"/>1 Not at all</br>
	<input type="radio" name="deux" value="2"/>2</br>
	<input type="radio" name="deux" value="3"/>3 Somewhat</br>
	<input type="radio" name="deux" value="4"/>4</br>
	<input type="radio" name="deux" value="5"/>5 Extremely</br>
	<input type="submit" name="pageone" value="Prev"/>
	<input type="submit" name="pagethree" value="Next"/>
	</p>

END_PAGE_TWO
	repeat_hidden();
	print "</form>";
}

sub page_three {
	print "<BODY BGCOLOR = 'ABACEF'>\n";
	print "<FONT COLOR ='000038'>\n";
	print<<END_PAGE_THREE;
<form>
	<h1>3. Is the web site easy to navigate?</h1></br>
	<p>
	<input type="radio" name="trois" value="1"/>1 Not at all</br>
	<input type="radio" name="trois" value="2"/>2</br>
	<input type="radio" name="trois" value="3"/>3 Somewhat</br>
	<input type="radio" name="trois" value="4"/>4</br>
	<input type="radio" name="trois" value="5"/>5 Extremely</br>
	<input type="submit" name="pagetwo" value="Prev"/>	
	<input type="submit" name="pagefour" value="Next"/>
	</p>
	
END_PAGE_THREE
	repeat_hidden();
	print "</form>";
}

sub page_four {
	print "<BODY BGCOLOR = 'ABACEF'>\n";
	print "<FONT COLOR ='000038'>\n";
	print<<END_PAGE_FOUR;
<form>
	<h1>4. Were you able to find the information you were looking for?</h1></br>
	<p>
	<input type="radio" name="quatre" value="1"/>1 No</br>
	<input type="radio" name="quatre" value="2"/>2 Yes</br>
	<input type="radio" name="quatre" value="3"/>0 N/A</br>
	<input type="submit" name="pagethree" value="Prev"/>	
	<input type="submit" name="pagefive" value="Next"/>
	</p>

END_PAGE_FOUR
	repeat_hidden();
	print "</form>";
}

sub page_five {
	print "<BODY BGCOLOR = 'ABACEF'>\n";
	print "<FONT COLOR ='000038'>\n";
	print<<END_PAGE_FIVE;
<form>
	<h1>5. What other information would you like to be included in the web site?</h1></br>
	<textarea name="cinq" cols="40" rows="10"></textarea></br>
	<input type="submit" name="pagefour" value="Prev"/>	
	<input type="submit" name="pagesix" value="Next"/>

END_PAGE_FIVE
	repeat_hidden();
	print "</form>";
}

sub page_six {
	print "<BODY BGCOLOR = 'ABACEF'>\n";
	print "<FONT COLOR ='000038'>\n";
	print<<END_PAGE_SIX;
<form>
	<h1>6. What suggestions you might have for our web site improvement?</h1></br>
	<textarea name="six" cols="40" rows="10"></textarea></br>
	<input type="submit" name="pagefive" value="Prev"/>	
	<input type="submit" name="completed" value="Next"/>
	
END_PAGE_SIX
	repeat_hidden();
	print "</form>";
}

sub survey_complete {
	print "<BODY BGCOLOR = 'ABACEF'>\n";
	print "<FONT COLOR ='000038'>\n";
	print "<h1>Thank you for your input.</h1>";
	save();
}

sub save {
	open(my $fh, '>>', 'Results.txt');
	foreach my $answer (@survey_answers) {
		if (defined param ($answer)) {
			print $fh param($answer), ".";
		}
	}
	close $fh;
}

exit(0);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
