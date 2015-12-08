#!c:/Perl/bin/perl.exe

use CGI;

print "Test 123";

sub open {
	open(my $fh, '<', 'Results.txt') or die "Can't open $filename: $!";

}
