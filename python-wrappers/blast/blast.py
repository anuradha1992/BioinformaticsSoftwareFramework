#!/usr/bin/env python
"""Example showing how to deal with internet BLAST from Biopython.
This code is described in great detail in the BLAST section of the Biopython
documentation.
"""
# standard library
from __future__ import print_function
import json

try:
    from StringIO import StringIO  # Python 2
except ImportError:
    from io import StringIO  # Python 3

# biopython
from Bio import SeqIO
from Bio.Blast import NCBIWWW
from Bio.Blast import NCBIXML

# first get the sequence we want to parse from a FASTA file
f_record = next(SeqIO.parse('/Users/anuradhawick/Documents/BioinformaticsSoftwareFramework/python-wrappers/blast/m_cold.fasta', 'fasta'))

# print('Doing the BLAST and retrieving the results...')
result_handle = NCBIWWW.qblast('blastn', 'nr', f_record.format('fasta'))

# save the results for later, in case we want to look at it
with open('m_cold_blast.out', 'w') as save_file:
    blast_results = result_handle.read()
    save_file.write(blast_results)

# print('Parsing the results and extracting info...')

# option 1 -- open the saved file to parse it
# option 2 -- create a handle from the string and parse it
string_result_handle = StringIO(blast_results)
b_record = NCBIXML.read(string_result_handle)

# now get the alignment info for all e values greater than some threshold
E_VALUE_THRESH = 0.1

alignments = []

for alignment in b_record.alignments:
    allAlignments = alignment.hsps
    bestAlignment = sorted(allAlignments, key=lambda val: val.expect)[0]
    # print('****Alignment****')
    # print('sequence: %s' % alignment.title)
    # print('length: %i' % alignment.length)
    # print('e value: %f' % bestAlignment.expect)
    # print(bestAlignment.query[0:75] + '...')
    # print(bestAlignment.match[0:75] + '...')
    # print(bestAlignment.sbjct[0:75] + '...')

    alignments.append({
        'title': alignment.title,
        'length': alignment.length,
        'e': bestAlignment.expect,
        'query': bestAlignment.query[0:75] + '...',
        'match': bestAlignment.match[0:75] + '...',
        'subject': bestAlignment.sbjct[0:75] + '...'
    })

print(json.dumps(alignments))
