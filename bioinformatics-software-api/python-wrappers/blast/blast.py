#!/usr/bin/env python
# standard library
from __future__ import print_function
import sys
import json

from Bio.Blast import NCBIWWW

program = sys.argv[1]
database = sys.argv[2]
sequence = sys.argv[3]
outputType = sys.argv[4]

result_handle = NCBIWWW.qblast(program=program, database=database, sequence=sequence, format_type=outputType)
blast_results = result_handle.read()

print(json.dumps(blast_results))
with open('m_cold_blast.out', 'w') as f:
    f.write(blast_results)
