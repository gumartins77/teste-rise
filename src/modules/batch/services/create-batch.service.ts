import { Injectable } from '@nestjs/common';
import { CreateBatchDto } from '../dto/create-batch.dto';
import { BatchRepository } from '../repository/batch.repository';

@Injectable()
export class CreateBatchService {
  async execute(data: CreateBatchDto) {
    const batchRepository = new BatchRepository();

    const newBacth = await batchRepository.createBatch(data);

    return newBacth;
  }
}
