#!/usr/bin/env python
# standard library
from __future__ import print_function
import json
import sys
import os

try:
    from StringIO import StringIO  # Python 2
except ImportError:
    from io import StringIO  # Python 3

# biopython
from Bio import SeqIO
from Bio.Blast import NCBIWWW
from Bio.Blast import NCBIXML

# Fasta file for temp use
# fastaFile = sys.argv[1]
fastaFile = '/Users/anuradhawick/Documents/BioinformaticsSoftwareFramework/bioinformatics-software-api/python-wrappers/blast/m_cold.fasta'

# first get the sequence we want to parse from a FASTA file
f_record = next(SeqIO.parse(fastaFile, 'fasta'))

# print('Doing the BLAST and retrieving the results...')
result_handle = NCBIWWW.qblast('blastn', 'nr', f_record.format('fasta'), format_type="Text")

# save the results for later, in case we want to look at it
with open('m_cold_blast.out', 'w') as save_file:
    blast_results = result_handle.read()
    save_file.write(blast_results)

string_result_handle = StringIO(blast_results)
# print(blast_results)
with open('test', 'w') as f:
    print(blast_results, file=f)
    # f.writelines(blast_results)

# b_record = NCBIXML.read(string_result_handle)
#
# # now get the alignment info for all e values greater than some threshold
# E_VALUE_THRESH = 0.1
#
# alignments = []
#
#
# for alignment in b_record.alignments:
#     allAlignments = alignment.hsps
#     bestAlignment = sorted(allAlignments, key=lambda val: val.expect)[0]
#     # print('****Alignment****')
#     # print('sequence: %s' % alignment.title)
#     # print('length: %i' % alignment.length)
#     # print('e value: %f' % bestAlignment.expect)
#     # print(bestAlignment.query[0:75] + '...')
#     # print(bestAlignment.match[0:75] + '...')
#     # print(bestAlignment.sbjct[0:75] + '...')
#
#     # Processing visualization data
#
#
#     # print(bestAlignment)
#     # print(json.dumps(bestAlignment))
#     exit(0)
#     alignments.append({
#         'title': alignment.title,
#         'length': alignment.length,
#         'e': bestAlignment.expect,
#         'query': bestAlignment.query[0:75] + '...',
#         'score': bestAlignment.score,
#         'match': bestAlignment.match[0:75] + '...',
#         'subject': bestAlignment.sbjct[0:75] + '...'
#     })
#
# # os.remove(fastaFile)
# print(json.dumps(alignments))
